import React, { useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TripCard } from '@carpool/client/components';
import { SearchResultsProps } from '../NavigationTypes/navigation-types';
import {
  AppDispatch,
  listSearchResults,
  RootStore,
} from '@carpool/client/store';
import { formatDate } from '@carpool/client/shared/utilities';

export function SearchResults({ navigation, route }: SearchResultsProps) {
  const {
    date,
    startLongitude,
    startLatitude,
    destinationLongitude,
    destinationLatitude,
  } = route.params;

  const dispatch: AppDispatch = useDispatch();

  const searchResults = useSelector((state: RootStore) => state.searchResults);
  const { trips: searchTrips, status } = searchResults;

  useEffect(() => {
    dispatch(
      listSearchResults({
        date,
        startLongitude,
        startLatitude,
        destinationLongitude,
        destinationLatitude,
      })
    );
  }, [
    dispatch,
    date,
    startLongitude,
    startLatitude,
    destinationLongitude,
    destinationLatitude,
  ]);

  const viewTrip = (tripId: string) => {
    navigation.push('TripDetails', { tripId, type: 'not_booked' });
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
          Search Results
        </Text>
        <View style={{ flex: 1 }}></View>
      </View>
      {status === 'loading' ? (
        <ActivityIndicator />
      ) : (
        <ScrollView style={{ width: '100%', paddingHorizontal: 20 }}>
          {searchTrips ? (
            searchTrips?.length === 0 ? (
              <Text>You have not offered any trips...</Text>
            ) : (
              searchTrips?.map((trip) => (
                <TripCard
                  key={trip.tripId}
                  tripId={trip.tripId}
                  driver={trip.driver.name}
                  startLocation={trip.coordinates[0].address}
                  destination={trip.coordinates[1].address}
                  created={formatDate(trip.createdAt)}
                  image={trip.driver.profilePic}
                  date={trip.tripDate}
                  distance=""
                  rating={trip.driver.avgRating}
                  onPress={() => viewTrip(trip.tripId)}
                />
              ))
            )
          ) : (
            //eslint-disable-next-line
            <></>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default SearchResults;
