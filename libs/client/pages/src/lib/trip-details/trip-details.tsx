import React, { useEffect } from 'react';
import { TripDetailsPageProps } from '../NavigationTypes/navigation-types';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { bookTrip, RootStore } from '@carpool/client/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  fetchTripDetails,
  startTrip,
} from '@carpool/client/store';
import {
  TripDetailsMapView,
  TripDetailsTopBar,
  TripDetailsLocations,
  TripDetailsIcons,
  TripDetailsBottomContainer,
} from '@carpool/client/components';
import Toast from 'react-native-toast-message';

export function TripDetails({ route, navigation }: TripDetailsPageProps) {
  const { tripId, type } = route.params;

  const dispatch: AppDispatch = useDispatch();

  const tripDetails = useSelector((state: RootStore) => state.trip);
  const { trip, status } = tripDetails;

  const user = useSelector((state: RootStore) => state.user);
  const { user: userData } = user;

  const startTripState = useSelector((state: RootStore) => state.startTrip);
  const { status: tripStartStatus } = startTripState;

  const startTripHandle = (tripId: string) => {
    dispatch(startTrip({ id: tripId }));
  };

  const showToast = (message: string) => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: message,
      topOffset: 300,
    });
  };

  useEffect(() => {
    dispatch(fetchTripDetails(tripId));

    if (tripStartStatus === 'success') {
      navigation.navigate('DriverActiveTrip', { tripId });
      navigation.popToTop();
    }
  }, [dispatch, tripId, tripStartStatus, navigation]);

  const bookRide = (tripId: string) => {
    if (trip?.driver.id === userData?.id) {
      startTripHandle(tripId);
    } else {
      dispatch(
        bookTrip({
          tripId,
          passengerId: userData ? userData.id : '',
          seatsBooked: '1',
          status: 'unpaid',
          price: trip ? `${trip.price}` : '',
          address: trip ? trip.coordinates[0].address : '',
          latitude: trip ? trip.coordinates[0].latitude : '',
          longitude: trip ? trip.coordinates[0].longitude : '',
        })
      );

      showToast('Trip booked successfully');
      navigation.popToTop();
    }
  };

  const openChat = (senderId: string, receiverId: string) => {
    navigation.navigate('ChatScreen', { senderId, receiverId });
  };

  return (
    <View
      style={[
        styles.flexCol,
        {
          height: '100%',
        },
      ]}
    >
      {status === 'loading' || tripStartStatus === 'loading' ? (
        <View
          style={[
            styles.flexRow,
            {
              height: '100%',
              width: '100%',
            },
          ]}
        >
          <ActivityIndicator size="large" color="#188aed" />
        </View>
      ) : trip && userData ? (
        <>
          {trip && (
            <TripDetailsTopBar
              trip={trip}
              onPress={() => navigation.goBack()}
              userId={userData.id}
              tripId={tripId}
            />
          )}
          {trip && <TripDetailsMapView trip={trip} />}
          <View style={styles.bottomSection}>
            <View style={[styles.flexCol, { flex: 1.5 }]}>
              {trip && <TripDetailsLocations trip={trip} />}
              {trip && <TripDetailsIcons trip={trip} />}
            </View>
            {trip && (
              <TripDetailsBottomContainer
                trip={trip}
                type={type}
                onPress={() => bookRide(tripId)}
                onPressUser={() =>
                  navigation.navigate('DriverProfile', {
                    driverId: trip.driver.id,
                  })
                }
                chat={() => openChat(userData.id, trip.driver.id)}
                userId={userData ? userData.id : ''}
              />
            )}
          </View>
        </>
      ) : (
        /* eslint-disable-next-line */
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  flexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bottomSection: {
    flex: 3,
    display: 'flex',
    zIndex: 20,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
});

export default TripDetails;
