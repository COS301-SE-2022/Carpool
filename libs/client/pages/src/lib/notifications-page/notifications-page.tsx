import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { NotificationsPageProps } from '../NavigationTypes/navigation-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppDispatch,
  RootStore,
  listNotifications,
  fetchTripDetails,
} from '@carpool/client/store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, getTime } from '@carpool/client/shared/utilities';

const { blue, black, white } = colors;

export function NotificationsPage({ navigation }: NotificationsPageProps) {
  const dispatch: AppDispatch = useDispatch();

  const notificationState = useSelector(
    (state: RootStore) => state.notifications
  );
  const { notifications, status: notificationStatus } = notificationState;

  const userState = useSelector((state: RootStore) => state.user);
  const { user: userData } = userState;

  const acceptState = useSelector((state: RootStore) => state.acceptTrip);
  const { status: acceptStatus } = acceptState;

  const declineState = useSelector((state: RootStore) => state.declineTrip);
  const { status: declineStatus } = declineState;

  const paymentStatusState = useSelector(
    (state: RootStore) => state.updatePaymentStatus
  );
  const { status: paymentStatus, error: paymentStatusError } =
    paymentStatusState;

  useEffect(() => {
    if (userData) {
      dispatch(listNotifications(userData.id));
    }
  }, [userData, dispatch, acceptStatus, declineStatus, paymentStatus]);

  const goTo = (type: string, entity: string) => {
    if (type === 'bookingRequest') {
      navigation.push('BookingRequest', { bookingId: entity });
    } else if (type === 'bookingAccepted') {
      navigation.push('CreditCard', {
        tripId: entity,
        description: 'trip',
        cost: -1,
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        height: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingTop: 20,
          marginBottom: 10,
        }}
      >
        <Icon
          name="chevron-left"
          size={25}
          style={{
            color: '#000',
            flex: 1,
          }}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            fontWeight: '600',
            fontSize: 15,
            flex: 10,
            textAlign: 'center',
          }}
        >
          Notifications
        </Text>
        <View style={{ flex: 1 }}></View>
      </View>
      {notificationStatus === 'loading' ? (
        <ActivityIndicator size="large" color="#188aed" />
      ) : notifications?.length === 0 ? (
        <View
          style={{
            height: '60%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: '#188aed',
              fontWeight: '600',
              fontSize: 18,
            }}
          >
            You have no notifications
          </Text>
        </View>
      ) : (
        <ScrollView style={{ flex: 1, width: '100%', paddingHorizontal: 20 }}>
          {notifications?.map((notification, index) => (
            <Pressable
              key={index}
              style={[styles.card, styles.shadow, { paddingVertical: 15 }]}
              onPress={() => goTo(notification.type, notification.entity)}
            >
              <View style={[styles.flexColumn, { paddingBottom: 10 }]}>
                <View style={[styles.flexRow, { flex: 5, marginBottom: 5 }]}>
                  <Text
                    style={[styles.day, { paddingLeft: 20, flex: 1 }]}
                    numberOfLines={1}
                  >
                    {notification.type === 'bookingRequest'
                      ? 'Booking Request'
                      : notification.type === 'payment'
                      ? 'Payment Made'
                      : notification.type === 'bookingAccepted'
                      ? 'Request Accepted'
                      : notification.type === 'bookingDeclined'
                      ? 'Request Declined'
                      : notification.type === 'tripStarted'
                      ? 'Trip Started'
                      : notification.type === 'tripEnded'
                      ? 'Trip Ended'
                      : ''}
                  </Text>
                  <Text style={{ color: black, textAlign: 'right', flex: 1 }}>
                    {getTime(notification.createdAt)}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.date, { paddingLeft: 20 }]}>
                    {notification.message}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container2: {
    backgroundColor: '#282D46',
    width: '100%',
    padding: 12,
    paddingVertical: 8,
    borderRadius: 25,
  },
  text: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
  card: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    marginVertical: 10,
    backgroundColor: white,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 4,
    borderWidth: 3,
    borderColor: '#188aed',
  },
  day: {
    maxWidth: '75%',
    textAlign: 'left',
    color: black,
    fontSize: 15,
    fontWeight: '700',
  },
  date: {
    color: blue,
    fontSize: 12,
  },
  shadow: {
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});

export default NotificationsPage;
