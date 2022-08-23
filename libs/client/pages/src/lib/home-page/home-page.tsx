import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import {
  RootStore,
  AppDispatch,
  TripListType,
  resetStart,
  resetEnd,
  listUpcomingTrips,
} from '@carpool/client/store';
import { HomePageProps } from '../NavigationTypes/navigation-types';
import {
  TripCardSmall,
  HomeOptionBox,
  HomeSearchBar,
  HomeMapView,
} from '@carpool/client/components';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { styles } from './home-page.style';

export function HomePage({ navigation }: HomePageProps) {
  const dispatch: AppDispatch = useDispatch();

  const tripState = useSelector((state: RootStore) => state.upcomingTrips);
  const { trips, status } = tripState;

  const userState = useSelector((state: RootStore) => state.user);
  const { user: userData } = userState;

  const startTripState = useSelector((state: RootStore) => state.startTrip);
  const { status: tripStartStatus } = startTripState;

  const endTripState = useSelector((state: RootStore) => state.endTrip);
  const { status: endTripStatus } = endTripState;

  useEffect(() => {
    dispatch(listUpcomingTrips());

    if (endTripStatus === 'success') {
      dispatch(resetEnd());
    }

    if (tripStartStatus === 'success') {
      dispatch(resetStart());
    }
  }, [dispatch, endTripStatus, tripStartStatus]);

  const viewTrip = (tripId: string, trip: TripListType) => {
    if (trip.status === 'active') {
      if (trip.driver.id === userData?.id) {
        //**Driver active screen */
        navigation.navigate('DriverActiveTrip', { tripId });
      } else {
        //** Passenger active screen */
        navigation.navigate('DriverActiveTrip', { tripId });
      }
    } else {
      navigation.push('TripDetails', { tripId, type: 'booked' });
    }
  };

  const createTrip = () => {
    if (userData && userData.isDriver) {
      navigation.navigate('PostTrips');
    } else {
      Alert.alert(
        'You are not registered as a driver',
        'Would you like to register?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              navigation.navigate('RegisterDriver', {
                userId: userData ? userData.id : '',
              });
              // navigation.navigate('OnboardPage');
            },
          },
        ]
      );
    }
  };

  return (
    <View style={[styles.flexCol, { flex: 1 }]}>
      <HomeSearchBar
        onPress={() => navigation.push('SearchPage')}
        onPressCart={() => navigation.push('CheckoutTrips')}
      />
      <HomeMapView />
      <View style={styles.bottomContainer}>
        <HomeOptionBox
          onPress={() => navigation.push('SearchPage')}
          onPressCreate={() => createTrip()}
        />
        <View style={styles.cardContainer}>
          {trips && trips.length !== 0 && trips[0].status === 'active' ? (
            <Text style={styles.smallTextBlack}>
              Active trip
              <Icon
                name="shopping-cart"
                size={30}
                style={{ color: '#188aed', alignSelf: 'flex-end' }}
                onPress={() => navigation.push('CheckoutTrips')}
              />
            </Text>
          ) : (
            <Text style={styles.smallTextBlack}>
              Upcoming trip
              { <Icon
                name="star"
                size={30}
                style={{ color: '#FFFF00', alignSelf: 'flex-end' }}
                onPress={() => navigation.push('ReviewPage')}
              />}
            </Text>
          )}

          {status === 'loading' ? (
            <ActivityIndicator size="large" />
          ) : trips && trips.length !== 0 ? (
            <TripCardSmall
              key={trips[0].tripId}
              startLocation={trips[0].coordinates[0].address}
              destination={trips[0].coordinates[1].address}
              endLat={trips[0].coordinates[1].latitude}
              endLong={trips[0].coordinates[1].longitude}
              date={trips[0].tripDate}
              type="passenger"
              onPress={() => viewTrip(trips[0].tripId, trips[0])}
            />
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
