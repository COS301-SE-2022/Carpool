import React, { useEffect, useState } from 'react';
import { Button, TripDetailsMapView } from '@carpool/client/components';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  fetchTripDetails,
  RootStore,
  endTrip,
} from '@carpool/client/store';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import { DriverActiveTripProps } from '../NavigationTypes/navigation-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function myJoin(array: string[], separator: string) {
  let newString = '';
  separator = separator || ',';

  array.forEach((a, i, arr) => {
    newString += `${a}${i < arr.length - 1 ? separator : ''}`;
  });
  return newString;
}

export function DriverActiveTrip({ navigation, route }: DriverActiveTripProps) {
  const { tripId } = route.params;

  console.log('ACTIVE TIRP');

  const dispatch: AppDispatch = useDispatch();

  const tripDetails = useSelector((state: RootStore) => state.trip);
  const { trip, status } = tripDetails;

  const userState = useSelector((state: RootStore) => state.user);
  const { user: userData } = userState;

  const endTripState = useSelector((state: RootStore) => state.endTrip);
  const { status: endTripStatus } = endTripState;

  useEffect(() => {
    dispatch(fetchTripDetails(tripId));

    if (endTripStatus === 'success') {
      navigation.popToTop();
    }
  }, [dispatch, tripId, endTripStatus, navigation]);

  const endTripHandle = (tripId: string) => {
    dispatch(endTrip({ id: tripId }));
  };

  const handleEmergency = () => {
    Alert.alert('Contacting emergency contact...', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const openMaps = () => {
    if (trip) {
      const start = trip.coordinates[0].address.replace(/\s/g, '+');
      const end = trip.coordinates[1].address.replace(/\s/g, '+');

      const waypoints: string[] = [];

      trip.passengers.map((passenger) => {
        const waypoint = passenger.pickUp.address.replace(/\s/g, '+');

        waypoints.push(waypoint);
      });

      const waypointString = myJoin(waypoints, '%7C');

      Linking.openURL(
        `https://www.google.com/maps/dir/?api=1&origin=${start}&destination=${end}&travelmode=driving&waypoints=${waypointString}`
      );
    }
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
      {status === 'loading' || endTripStatus === 'loading' ? (
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
            <View style={[styles.shadow, styles.flexRow, styles.topBar]}>
              <Icon
                name="arrow-left"
                size={22}
                style={{ color: '#fff', flex: 1 }}
                onPress={() => navigation.navigate('HomePage')}
              />
              <View style={{ flex: 4 }}>
                <Text style={styles.textLargeWhite}>Driving To</Text>
                <Text style={styles.textSmallWhite} numberOfLines={2}>
                  {trip && trip.coordinates[0].address}
                </Text>
              </View>
            </View>
          )}
          {trip && <TripDetailsMapView trip={trip} active={true} />}
          {userData?.id === trip.driver.id ? (
            <View style={[styles.bottomSection, { flex: 3 }]}>
              <View style={[styles.flexCol, styles.userContainer]}>
                <Button title="Open Maps" onPress={openMaps} colour="#188aed" />
                <Button
                  title="End Trip"
                  onPress={() => endTripHandle(tripId)}
                  colour="red"
                />
              </View>
            </View>
          ) : (
            <View style={styles.bottomSection}>
              <View style={[styles.flexCol, styles.userContainer]}>
                <Button
                  title="Emergency Contact"
                  onPress={() => handleEmergency()}
                  colour="red"
                />
              </View>
            </View>
          )}
        </>
      ) : (
        /* eslint-disable-next-line */
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
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
  line: {
    width: 4,
    flex: 3.1,
    backgroundColor: '#188aed',
    marginLeft: -0.8,
  },
  startIcon: {
    flex: 1,
    color: '#188aed',
    zIndex: 200,
  },
  endIcon: {
    flex: 1.2,
    marginTop: -4,
    color: '#188aed',
  },
  textLargeBlack: {
    fontWeight: '600',
    fontSize: 18,
  },
  topBar: {
    backgroundColor: '#188aed',
    flex: 2,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 40,
    marginBottom: -10,
    paddingHorizontal: 30,
    zIndex: 20,
  },
  textLargeWhite: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 35,
    marginBottom: 5,
  },
  textSmallWhite: {
    color: '#fff',
    fontWeight: '500',
    maxWidth: '80%',
    lineHeight: 20,
  },
  bottomSection: {
    flex: 2,
    display: 'flex',
    zIndex: 20,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  container: {
    // alignItems: 'center',

    justifyContent: 'center',

    display: 'flex',
  },

  flexColumn: {
    flexDirection: 'column',

    height: '100%',

    marginHorizontal: 40,

    justifyContent: 'space-between',
  },

  borderStyle: {
    borderColor: '#ccc',

    borderWidth: 1,

    borderStyle: 'solid',
  },

  title: {
    fontSize: 30,

    textAlign: 'center',

    fontWeight: '700',
  },

  input: {
    height: 40,

    marginVertical: 8,

    padding: 8,

    paddingLeft: 5,

    borderBottomColor: '#808080',

    borderBottomWidth: 1,

    borderStyle: 'solid',

    flex: 10,
  },

  passwordInput: {
    height: 40,

    paddingLeft: 5,

    flex: 10,
  },

  button: {
    backgroundColor: '#188aed',

    width: '100%',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default DriverActiveTrip;
