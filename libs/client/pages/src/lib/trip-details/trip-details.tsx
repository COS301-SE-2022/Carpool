import React, { useEffect } from 'react';
import { TripDetailsPageProps } from '../NavigationTypes/navigation-types';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { RootStore } from '@carpool/client/store';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, fetchTripDetails } from '@carpool/client/store';
import {
  TripDetailsMapView,
  TripDetailsTopBar,
  TripDetailsLocations,
  TripDetailsIcons,
  TripDetailsBottomContainer,
} from '@carpool/client/components';

export function TripDetails({ route, navigation }: TripDetailsPageProps) {
  const { tripId } = route.params;

  const dispatch: AppDispatch = useDispatch();

  const tripDetails = useSelector((state: RootStore) => state.trip);
  const { trip, status } = tripDetails;

  useEffect(() => {
    dispatch(fetchTripDetails(tripId));
  }, [dispatch, tripId]);

  const bookRide = (tripId: string) => {
    console.log(`Booking ride ${tripId}`);
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
      {status === 'loading' ? (
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
      ) : trip ? (
        <>
          {trip && (
            <TripDetailsTopBar
              trip={trip}
              onPress={() => navigation.goBack()}
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
                onPress={() => bookRide(tripId)}
                onPressUser={() =>
                  navigation.navigate('DriverProfile', {
                    driverId: trip.driver.id,
                  })
                }
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
