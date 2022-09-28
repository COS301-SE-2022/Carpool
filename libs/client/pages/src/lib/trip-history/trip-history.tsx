import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import { TripHistoryProps } from '../NavigationTypes/navigation-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppDispatch,
  listDriverHistory,
  listPassengerHistory,
  RootStore,
} from '@carpool/client/store';
import { TripCard } from '@carpool/client/components';
import { formatDate } from '@carpool/client/shared/utilities';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function TripHistory({ navigation }: TripHistoryProps) {
  const dispatch: AppDispatch = useDispatch();

  const [driver, setDriver] = useState(true);

  const user = useSelector((state: RootStore) => state.user);
  const { user: userData } = user;

  const driverHistory = useSelector((state: RootStore) => state.driverHistory);
  const { trips: driverTrips, status: driverHistoryStatus } = driverHistory;

  const passengerHistory = useSelector(
    (state: RootStore) => state.passengerHistory
  );
  const { trips: passengerTrips, status: passengerHistoryStatus } =
    passengerHistory;

  useEffect(() => {
    if (userData) {
      dispatch(listDriverHistory(userData.id));
      console.log('Driver History' + driverHistory);
    }
  }, [dispatch, userData]);

  const asDriver = () => {
    setDriver(true);
    console.log('As Driver');
    userData && dispatch(listDriverHistory(userData.id));
  };

  const asPassenger = () => {
    setDriver(false);
    console.log('As Passenger');
    userData && dispatch(listPassengerHistory(userData.id));
  };

  const viewTrip = (tripId: string) => {
    navigation.push('TripDetails', { tripId, type: 'completed' });
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
          Trip History
        </Text>
        <View style={{ flex: 1 }}></View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginBottom: 10,
          paddingHorizontal: 30,
        }}
      >
        <Pressable
          onPress={asDriver}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: driver ? '#188aed' : 'transparent',
            borderRadius: 15,
          }}
        >
          <Text
            style={{
              color: driver ? '#fff' : '#000',
              fontWeight: '600',
            }}
          >
            Driver
          </Text>
        </Pressable>
        <Pressable
          onPress={asPassenger}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: !driver ? '#188aed' : 'transparent',
            borderRadius: 15,
          }}
        >
          <Text style={{ color: !driver ? '#fff' : '#000', fontWeight: '600' }}>
            Passenger
          </Text>
        </Pressable>
      </View>
      {driverHistoryStatus === 'loading' ||
      passengerHistoryStatus === 'loading' ? (
        <ActivityIndicator />
      ) : (
        <ScrollView style={{ width: '100%', paddingHorizontal: 20 }}>
          {driver ? (
            driverTrips?.length === 0 ? (
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: 20,
                }}
              >
                <Text style={{ fontWeight: '600', color: '#333' }}>
                  You have not offered any trips...
                </Text>
              </View>
            ) : (
              driverTrips?.map((trip) => (
                <TripCard
                  key={trip.tripId}
                  tripId={trip.tripId}
                  driver={trip.driver.name}
                  startLocation={trip.coordinates[0].address}
                  destination={trip.coordinates[1].address}
                  created={formatDate(trip.createdAt)}
                  image={trip.driver.profilePic}
                  date={formatDate(trip.createdAt)}
                  distance=""
                  rating={trip.driver.avgRating}
                  onPress={() => viewTrip(trip.tripId)}
                />
              ))
            )
          ) : passengerTrips?.length === 0 ? (
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 20,
              }}
            >
              <Text style={{ fontWeight: '600', color: '#333' }}>
                You have not taken any trips...
              </Text>
            </View>
          ) : (
            passengerTrips?.map((trip) => (
              <TripCard
                key={trip.tripId}
                tripId={trip.tripId}
                driver={trip.driver.name}
                startLocation={trip.coordinates[0].address}
                destination={trip.coordinates[1].address}
                created={formatDate(trip.createdAt)}
                image={trip.driver.profilePic}
                date={formatDate(trip.createdAt)}
                distance=""
                rating={trip.driver.avgRating}
                onPress={() => viewTrip(trip.tripId)}
              />
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default TripHistory;
