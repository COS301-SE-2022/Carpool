import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StatisticsProps } from '../NavigationTypes/navigation-types';
import { RequestCard } from '@carpool/client/components';
import {
  AppDispatch,
  RootStore,
  listTripRequests,
  acceptTripRequest,
  resetAccept,
  resetDecline,
  declineTripRequest,
} from '@carpool/client/store';
import { useSelector, useDispatch } from 'react-redux';

export function Statistics({ navigation }: StatisticsProps) {
  const dispatch: AppDispatch = useDispatch();

  const requestsState = useSelector((state: RootStore) => state.tripRequests);
  const { requests, status } = requestsState;

  const acceptState = useSelector((state: RootStore) => state.acceptTrip);
  const { status: acceptStatus } = acceptState;

  const declineState = useSelector((state: RootStore) => state.declineTrip);
  const { status: declineStatus } = declineState;

  const userState = useSelector((state: RootStore) => state.user);
  const { user: userData } = userState;

  useEffect(() => {
    if (userData) {
      dispatch(listTripRequests(userData.id));
    }

    if (acceptStatus === 'success') {
      dispatch(resetAccept());
    }

    if (declineStatus === 'success') {
      dispatch(resetDecline());
    }
  }, [userData, dispatch, acceptStatus, declineStatus]);

  const acceptRequest = (id: string, bookingId: string) => {
    dispatch(acceptTripRequest({ id, bookingId }));
  };

  const declineRequest = (bookingId: string) => {
    dispatch(declineTripRequest({ bookingId }));
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
          Trip Requests
        </Text>
        <View style={{ flex: 1 }}></View>
      </View>
      {status === 'loading' ? (
        <ActivityIndicator size="large" color="#188aed" />
      ) : requests?.length === 0 ? (
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
            You have no trip requests
          </Text>
        </View>
      ) : (
        <ScrollView style={{ width: '100%', paddingHorizontal: 20 }}>
          {requests?.map((request, index) => (
            <RequestCard
              key={index}
              trip={request}
              onPressAccept={() =>
                acceptRequest(request.trip.tripId, request.bookingId)
              }
              onPressDecline={() => declineRequest(request.bookingId)}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default Statistics;
