import React, { useEffect, useState, useRef } from 'react';
import { BookingRequestProps } from '../NavigationTypes/navigation-types';
import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import Icons from 'react-native-vector-icons/MaterialIcons';
import IconsFont from 'react-native-vector-icons/FontAwesome';
import {
  AppDispatch,
  findBookingRequest,
  RootStore,
  acceptTripRequest,
  resetAccept,
  resetDecline,
  declineTripRequest,
  deleteBookingRequestNotification,
} from '@carpool/client/store';
import { formatDate } from '@carpool/client/shared/utilities';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export function BookingRequest({ navigation, route }: BookingRequestProps) {
  const { bookingId } = route.params;

  const [distance, setDistance] = useState('');

  const GOOGLE_MAPS_APIKEY = 'AIzaSyBWXW1Mq7vb6wIIfdHFEzp9xuknlomPJkg';

  const { width, height } = Dimensions.get('window');

  const mapView = useRef<MapView>(null);

  const dispatch: AppDispatch = useDispatch();

  const bookingRequestState = useSelector(
    (state: RootStore) => state.bookingRequest
  );
  const { request, status } = bookingRequestState;

  const userState = useSelector((state: RootStore) => state.user);
  const { user } = userState;

  const acceptState = useSelector((state: RootStore) => state.acceptTrip);
  const { status: acceptStatus } = acceptState;

  const declineState = useSelector((state: RootStore) => state.declineTrip);
  const { status: declineStatus } = declineState;

  useEffect(() => {
    dispatch(findBookingRequest(bookingId));

    if (acceptStatus === 'success') {
      navigation.navigate('NotificationsPage');
      dispatch(resetAccept());
      user &&
        dispatch(
          deleteBookingRequestNotification({
            userId: user.id,
            entity: bookingId,
          })
        );
    }

    if (declineStatus === 'success') {
      navigation.navigate('NotificationsPage');
      dispatch(resetDecline());
    }
  }, [dispatch, bookingId, acceptStatus, declineStatus, navigation, user]);

  const acceptRequest = (id: string, bookingId: string) => {
    dispatch(acceptTripRequest({ id, bookingId }));
  };

  const declineRequest = (bookingId: string) => {
    dispatch(declineTripRequest({ bookingId }));
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
      ) : request ? (
        <>
          {request && (
            <View style={[styles.shadow, styles.flexRow, styles.topBar]}>
              <Icon
                name="arrow-left"
                size={22}
                style={{ color: '#fff', flex: 1 }}
                onPress={() => navigation.goBack()}
              />
              <View style={{ flex: 4 }}>
                <Text style={styles.textLargeWhite}>
                  {request && formatDate(request.tripDate)}
                </Text>
                <Text style={styles.textSmallWhite} numberOfLines={2}>
                  Trip to {request && request.endAddress}
                </Text>
              </View>
            </View>
          )}
          {request && (
            <View style={[styles.flexRow, styles.flexStyle1]}>
              <MapView
                initialRegion={{
                  latitude: parseFloat(request.startLat),
                  longitude: parseFloat(request.startLong),
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
                    latitude: parseFloat(request.startLat),
                    longitude: parseFloat(request.startLong),
                  }}
                  pinColor="#188aed"
                  flat={true}
                />
                <Marker
                  coordinate={{
                    latitude: parseFloat(request.endLat),
                    longitude: parseFloat(request.endLong),
                  }}
                  pinColor="#188aed"
                />
                <Marker
                  coordinate={{
                    latitude: parseFloat(request.pickupLat),
                    longitude: parseFloat(request.pickupLong),
                  }}
                />
                <MapViewDirections
                  origin={{
                    latitude: parseFloat(request.startLat),
                    longitude: parseFloat(request.startLong),
                  }}
                  destination={{
                    latitude: parseFloat(request.endLat),
                    longitude: parseFloat(request.endLong),
                  }}
                  waypoints={[
                    {
                      latitude: parseFloat(request.pickupLat),
                      longitude: parseFloat(request.pickupLong),
                    },
                  ]}
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
                    console.log('error');
                  }}
                />
                <View style={{ display: 'none' }}>
                  <MapViewDirections
                    origin={{
                      latitude: parseFloat(request.startLat),
                      longitude: parseFloat(request.startLong),
                    }}
                    destination={{
                      latitude: parseFloat(request.pickupLat),
                      longitude: parseFloat(request.pickupLong),
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

                      setDistance(result.distance);

                      console.log('new map');
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
                      console.log('error');
                    }}
                  />
                </View>
              </MapView>
            </View>
          )}
          <View style={styles.bottomSection}>
            <View style={[styles.flexCol, { flex: 3 }]}>
              {request && (
                <View
                  style={[
                    styles.flexRow,
                    {
                      flex: 2,
                      padding: 20,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.flexCol,
                      {
                        width: '100%',
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.flexRow,
                        {
                          flex: 1,
                          alignItems: 'center',
                        },
                      ]}
                    >
                      <Icons
                        name="my-location"
                        style={styles.startIcon}
                        size={22}
                      />
                      <View style={{ flex: 9 }}>
                        <Text>Pickup Location</Text>
                        <Text style={styles.textLargeBlack} numberOfLines={2}>
                          {request && request.pickupAddress}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.flexRow,
                        {
                          flex: 1,
                          alignItems: 'center',
                        },
                      ]}
                    >
                      <Icon
                        name="map-marker-distance"
                        style={styles.startIcon}
                        size={22}
                      />
                      <View style={{ flex: 9 }}>
                        {/* <Text>Pickup Location</Text> */}
                        <Text style={styles.textLargeBlack} numberOfLines={2}>
                          {`${Number(distance).toFixed(
                            2
                          )} km from start location`}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
            {request && (
              <View style={[styles.flexCol, styles.userContainer]}>
                <View style={[styles.flexRow, { flex: 1 }]}>
                  <View
                    style={[
                      styles.flexRow,
                      {
                        flex: 12,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.flexRow,
                        {
                          flex: 1,
                          justifyContent: 'flex-start',
                        },
                      ]}
                    >
                      <Image
                        source={{ uri: request.passengerPic }}
                        resizeMode="cover"
                        style={styles.image}
                      />
                      <View>
                        <Text
                          style={[
                            styles.textLargeBlack,
                            {
                              marginBottom: 5,
                            },
                          ]}
                        >
                          {request && request.passengerName}
                        </Text>
                        <View
                          style={[
                            styles.flexRow,
                            { justifyContent: 'flex-start' },
                          ]}
                        >
                          <Icon
                            size={20}
                            name={
                              request.passengerRating >= 1
                                ? 'start'
                                : request.passengerRating >= 0.5
                                ? 'star-half-full'
                                : 'star-outline'
                            }
                            color="#FACC15"
                          />
                          <Icon
                            size={20}
                            name={
                              request.passengerRating >= 2
                                ? 'start'
                                : request.passengerRating >= 1.5
                                ? 'star-half-full'
                                : 'star-outline'
                            }
                            color="#FACC15"
                          />
                          <Icon
                            size={20}
                            name={
                              request.passengerRating >= 3
                                ? 'start'
                                : request.passengerRating >= 2.5
                                ? 'star-half-full'
                                : 'star-outline'
                            }
                            color="#FACC15"
                          />
                          <Icon
                            size={20}
                            name={
                              request.passengerRating >= 4
                                ? 'start'
                                : request.passengerRating >= 3.5
                                ? 'star-half-full'
                                : 'star-outline'
                            }
                            color="#FACC15"
                          />
                          <Icon
                            size={20}
                            name={
                              request.passengerRating >= 5
                                ? 'start'
                                : request.passengerRating >= 4.5
                                ? 'star-half-full'
                                : 'star-outline'
                            }
                            color="#FACC15"
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  {user && (
                    <Pressable
                      onPress={() => openChat(user.id, request.passengerId)}
                      style={[styles.shadow, styles.chatButton, { flex: 1 }]}
                    >
                      <Icons name="chat-bubble" color="#188aed" size={25} />
                    </Pressable>
                  )}
                </View>
              </View>
            )}
            <View
              style={[
                styles.flexRow,
                {
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                },
              ]}
            >
              {acceptStatus === 'loading' || declineStatus === 'loading' ? (
                <View style={{ flex: 1 }}>
                  <ActivityIndicator size="large" color="#188aed" />
                </View>
              ) : (
                <>
                  <View style={{ flex: 1, marginHorizontal: 3 }}>
                    <Pressable
                      onPress={() =>
                        acceptRequest(request.tripId, request.bookingId)
                      }
                    >
                      <View
                        style={[
                          styles.flexRow,
                          {
                            backgroundColor: '#188aed',
                            borderWidth: 2,
                            borderRadius: 50,
                            borderColor: '#188aed',
                            padding: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                          },
                        ]}
                      >
                        <Icon
                          size={15}
                          name="check"
                          color="#fff"
                          style={{ marginRight: 10 }}
                        />
                        <Text
                          style={{
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: 13,
                          }}
                        >
                          Accept
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                  <View style={{ flex: 1, marginHorizontal: 3 }}>
                    <Pressable
                      onPress={() => declineRequest(request.bookingId)}
                    >
                      <View
                        style={[
                          styles.flexRow,
                          {
                            backgroundColor: '#ff0000',
                            borderWidth: 2,
                            borderRadius: 50,
                            borderColor: '#ff0000',
                            padding: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                          },
                        ]}
                      >
                        <IconsFont
                          size={15}
                          name="times"
                          color="#fff"
                          style={{ marginRight: 10 }}
                        />
                        <Text
                          style={{
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: '600',
                            fontSize: 13,
                          }}
                        >
                          Decline
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                </>
              )}
            </View>
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
    paddingBottom: 30,
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
  userContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 3,
    borderColor: '#188aed',
  },
  textLargeBlack: {
    fontWeight: '600',
    fontSize: 18,
  },
  textMediumLight: {
    fontSize: 12,
    fontWeight: '400',
    color: '#808080',
    marginBottom: 5,
  },
  chatButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 15,
  },
  topBar: {
    backgroundColor: '#188aed',
    flex: 0.8,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 35,
    paddingBottom: 10,
    marginBottom: -10,
    paddingHorizontal: 30,
    zIndex: 20,
  },
  textLargeWhite: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 25,
    marginBottom: 5,
  },
  textSmallWhite: {
    color: '#fff',
    fontWeight: '500',
    maxWidth: '80%',
    lineHeight: 20,
  },
  cancelButton: {
    backgroundColor: '#ff0000',
    borderRadius: 40,
    padding: 10,
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  flexStyle1: {
    flex: 4,
  },
  flexStyle2: {
    flex: 9,
  },
});

export default BookingRequest;
