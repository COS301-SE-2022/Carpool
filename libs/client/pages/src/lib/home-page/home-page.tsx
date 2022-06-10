import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore, AppDispatch, listTrips } from '@carpool/client/store';
import { HomePageProps } from '../NavigationTypes/navigation-types';
import {
  TripCardSmall,
  HomeOptionBox,
  HomeSearchBar,
  HomeMapView,
} from '@carpool/client/components';
import { View, Text, ActivityIndicator } from 'react-native';
import { styles } from './home-page.style';

export function HomePage({ navigation }: HomePageProps) {
  const dispatch: AppDispatch = useDispatch();
  const tripState = useSelector((state: RootStore) => state.trips);
  const { trips, status } = tripState;

  useEffect(() => {
    dispatch(listTrips());
  }, [dispatch]);

  const viewTrip = (tripId: string) => {
    navigation.push('TripDetails', { tripId, type: 'booked' });
  };

  return (
    <View style={[styles.flexCol, { flex: 1 }]}>
      <HomeSearchBar onPress={() => navigation.push('SearchPage')} />
      <HomeMapView />
      <View style={styles.bottomContainer}>
        <HomeOptionBox
          onPress={() => navigation.push('SearchPage')}
          onPressCreate={() => navigation.push('PostTrips')}
        />
        <View style={styles.cardContainer}>
          <Text style={styles.smallTextBlack}>Upcoming trip</Text>
          {status === 'loading' ? (
            <ActivityIndicator size="large" />
          ) : trips ? (
            <>
              {trips.map((trip) => (
                <TripCardSmall
                  key={trip.tripId}
                  startLocation={trip.coordinates[0].address}
                  destination={trip.coordinates[1].address}
                  date={trip.tripDate}
                  type="passenger"
                  onPress={() => viewTrip(trip.tripId)}
                />
              ))}
            </>
          ) : (
            <View style={styles.noTripContainer}>
              <Text style={[styles.bigText]}>You have no upcoming trips</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export default HomePage;
