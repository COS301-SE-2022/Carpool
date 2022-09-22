import React, { useEffect, useState, useRef } from 'react';
import { TripDetailsPageProps } from '../NavigationTypes/navigation-types';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { bookTrip, RootStore } from '@carpool/client/store';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@carpool/client/components';
import {
  AppDispatch,
  fetchTripDetails,
  startTrip,
} from '@carpool/client/store';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './mapbox-styles.style';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { MapboxTestProps } from '../NavigationTypes/navigation-types';
import MapViewDirections from 'react-native-maps-directions';
// @ts-ignore
import BottomDrawer from 'react-native-bottom-drawer-view';

const TAB_BAR_HEIGHT = 80;
const HEADER_HEIGHT = 60;

export function MapboxTest({ route, navigation }: MapboxTestProps) {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyBWXW1Mq7vb6wIIfdHFEzp9xuknlomPJkg';
  const { tripId, type } = route.params;

  const { width, height } = Dimensions.get('window');

  const mapView = useRef<MapView>(null);

  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);

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

  const getArrival = (duration: number) => {
    const now = new Date();

    const arrival = new Date(now.getTime() + duration * 60000).toUTCString();

    return arrival.split(' ')[4].slice(0, 5);
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
            <View style={[styles.shadow, styles.flexRow, styles.topBar]}>
              <Icon
                name="arrow-left"
                size={22}
                style={{ color: '#fff', flex: 1 }}
                onPress={() => navigation.goBack()}
              />
              <View style={{ flex: 4 }}>
                <Text style={styles.textLargeWhite}>
                  {/* {trip && formatDate(trip.tripDate)} */}
                  Heading to {trip && trip.coordinates[0].address.split(',')[0]}
                  {/* {trip && trip.driver.name} */}
                </Text>
                <Text style={styles.textSmallWhite} numberOfLines={2}>
                  Arriving at {`${getArrival(duration)}`}
                </Text>
              </View>
            </View>
          )}
          {/* {trip && <TripDetailsMapView trip={trip} />} */}

          <View
            style={[
              styles.flexRow,
              trip.status === 'active'
                ? newStyles.flexStyle2
                : newStyles.flexStyle1,
            ]}
          >
            <MapView
              initialRegion={{
                latitude: parseFloat(trip.coordinates[0].latitude),
                longitude: parseFloat(trip.coordinates[0].longitude),
                latitudeDelta: 0,
                longitudeDelta: 0,
              }}
              zoomEnabled={false}
              zoomTapEnabled={false}
              zoomControlEnabled={false}
              rotateEnabled={false}
              scrollEnabled={false}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              ref={mapView}
            >
              <Marker
                coordinate={{
                  latitude: parseFloat(trip.coordinates[0].latitude),
                  longitude: parseFloat(trip.coordinates[0].longitude),
                }}
                pinColor="#188aed"
              />
              <Marker
                coordinate={{
                  latitude: parseFloat(trip.coordinates[1].latitude),
                  longitude: parseFloat(trip.coordinates[1].longitude),
                }}
                pinColor="#188aed"
              />
              {trip.coordinates.length >= 2 && (
                <MapViewDirections
                  origin={{
                    latitude: parseFloat(trip.coordinates[0].latitude),
                    longitude: parseFloat(trip.coordinates[0].longitude),
                  }}
                  destination={{
                    latitude: parseFloat(trip.coordinates[1].latitude),
                    longitude: parseFloat(trip.coordinates[1].longitude),
                  }}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={3}
                  strokeColor="#188aed"
                  resetOnChange={true}
                  optimizeWaypoints={true}
                  onStart={(params) => {
                    console.log(
                      `Started routing between "${params.origin}" and "${params.destination}"`
                    );
                  }}
                  onReady={(result) => {
                    console.log(`Distance: ${result.distance} km`);
                    console.log(`Duration: ${result.duration} min.`);

                    setDuration(result.duration);
                    setDistance(result.distance);

                    mapView.current?.fitToCoordinates(result.coordinates, {
                      edgePadding: {
                        right: width / 20,
                        bottom: height / 20,
                        left: width / 20,
                        top: height / 10,
                      },
                      animated: true,
                    });
                  }}
                  onError={(errorMessage) => {
                    showToast(errorMessage);
                  }}
                />
              )}
            </MapView>
          </View>
          <BottomDrawer
            containerHeight={400}
            offset={0}
            startUp={false}
            onExpanded={() => {
              console.log('expanded');
            }}
            onCollapsed={() => {
              console.log('collapsed');
            }}
          >
            <View style={newStyles.contentContainer}>
              <View
                style={{
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  borderColor: '#000',
                  marginHorizontal: 'auto',
                }}
              ></View>
              <View style={newStyles.buttonContainer}>
                <View style={{ flex: 1, marginHorizontal: 5 }}>
                  <Button
                    title="Cancel"
                    onPress={() => console.log('cancel')}
                  />
                </View>
                <View style={{ flex: 1, marginHorizontal: 5 }}>
                  <Button
                    title="Emergency"
                    onPress={() => console.log('cancel')}
                  />
                </View>
              </View>
            </View>
          </BottomDrawer>
        </>
      ) : (
        /* eslint-disable-next-line */
        <></>
      )}
    </View>
  );
}

// const styles = StyleSheet.create({
//   flexRow: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//   },
//   flexCol: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//   },
//   bottomSection: {
//     flex: 3,
//     display: 'flex',
//     zIndex: 20,
//     flexDirection: 'column',
//     backgroundColor: '#fff',
//   },
// });

const newStyles = StyleSheet.create({
  flexStyle1: {
    flex: 2.5,
  },
  flexStyle2: {
    flex: 9,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flex: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  text: {
    paddingHorizontal: 5,
  },
});

export default MapboxTest;
