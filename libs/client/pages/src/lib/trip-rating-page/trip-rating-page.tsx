import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native';
import { TripRatingPageProps } from '../NavigationTypes/navigation-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppDispatch,
  listDriverReviews,
  listPassengerReviews,
  RootStore,
} from '@carpool/client/store';
import { TripCard } from '@carpool/client/components';
import { formatDate, getDay, getTimeOfDay } from '@carpool/client/shared/utilities';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function TripRatingPage({ navigation }: TripRatingPageProps) {
  const dispatch: AppDispatch = useDispatch();

  const [driver, setDriver] = useState(true);

  const user = useSelector((state: RootStore) => state.user);
  const { user: userData } = user;

  const driverReviews = useSelector((state: RootStore) => state.driverReviews);
  const { trips: driverTrips, status: driverReviewsStatus } = driverReviews;

  const passengerReviews = useSelector((state: RootStore) => state.passengerReviews);
  const { trips: passengerTrips, status: passengerReviewsStatus } = passengerReviews;

  useEffect(() => {
    if (userData) {
      dispatch(listDriverReviews(userData.id));
    }
  }, [dispatch, userData]);

  const asDriver = () => {
    setDriver(true);
    console.log('As Driver');
    userData && dispatch(listDriverReviews(userData.id));
  };

  const asPassenger = () => {
    setDriver(false);
    console.log('As Passenger');
    userData && dispatch(listPassengerReviews(userData.id));
    console.log(passengerTrips);
  };

  const viewTrip = (tripId: string, driverId: string, driver: string, date: string, destination: string) => {
    navigation.push('ReviewPage', { tripId, driverId, driver, date, destination});
  };

  const viewTripDriver = (tripId: string,  date: string, destination: string) => {
    console.log('View Trip Driver');
    navigation.push('ReviewDriverPage', { tripId, date, destination});
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
          Review Trips
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
      {driverReviewsStatus === 'loading' ||
      passengerReviewsStatus === 'loading' ? (
        <ActivityIndicator />
      ) : (
        <ScrollView style={{ width: '100%', paddingHorizontal: 20 }}>
          {driver ? (
            driverTrips?.length === 0 ? (
              <Text>You have no passengers to review...</Text>
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
                  date={formatDate(trip.tripDate)}
                  distance=""
                  rating={trip.driver.avgRating}
                  onPress={() => viewTripDriver(trip.tripId, trip.tripDate, trip.coordinates[1].address)}
                />

              ))
            )
          ) : passengerTrips?.length === 0 ? (
            <Text>You have no trips to review</Text>
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
                date={formatDate(trip.tripDate)}
                distance=""
                rating={trip.driver.avgRating}
                onPress={() => viewTrip(trip.tripId, trip.driver.id, trip.driver.name , trip.tripDate, trip.coordinates[1].address )}
              />
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default TripRatingPage;

