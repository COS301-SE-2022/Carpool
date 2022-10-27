import React, { useEffect, useState } from 'react';
import { TripDetailsPageProps } from '../NavigationTypes/navigation-types';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
  Text,
} from 'react-native';
import { bookTrip, RootStore } from '@carpool/client/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  fetchTripDetails,
  startTrip,
} from '@carpool/client/store';
import {
  TripDetailsMapView,
  TripDetailsTopBar,
  TripDetailsLocations,
  TripDetailsIcons,
  TripDetailsBottomContainer,
} from '@carpool/client/components';
import Toast from 'react-native-toast-message';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export function TripDetails({ route, navigation }: TripDetailsPageProps) {
  const { tripId, type, startAddress, startLat, startLong } = route.params;

  type address = {
    address: string;
    latitude: string;
    longitude: string;
  };

  const [modalVisible, setModalVisible] = useState(false);

  const [pickup, setPickup] = useState({} as address);

  const dispatch: AppDispatch = useDispatch();

  const tripDetails = useSelector((state: RootStore) => state.trip);
  const { trip, status } = tripDetails;

  const user = useSelector((state: RootStore) => state.user);
  const { user: userData } = user;

  const startTripState = useSelector((state: RootStore) => state.startTrip);
  const { status: tripStartStatus } = startTripState;

  const tripBookingState = useSelector((state: RootStore) => state.booking);
  const { status: tripBookingStatus } = tripBookingState;

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
  const showToastError = (message: string) => {
    Toast.show({
      type: 'error',
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

  useEffect(() => {
    if (tripBookingStatus === 'success') {
      showToast('Trip booked successfully');
      navigation.navigate('HomePage');
    }
  }, [tripBookingStatus, navigation]);

  const bookRide = (tripId: string) => {
    if (startAddress && startLong && startLat) {
      dispatch(
        bookTrip({
          tripId,
          passengerId: userData ? userData.id : '',
          seatsBooked: '1',
          status: 'requested',
          price: trip ? `${trip.price}` : '',
          address: startAddress,
          latitude: startLat,
          longitude: startLong,
        })
      );
    } else {
      showToastError('Please enter a pickup location');
    }
  };

  const setPickupLocation = () => {
    setModalVisible(true);
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
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Text style={styles.modalText}>Set Pickup Location</Text>
              <View
                style={{ position: 'relative', paddingBottom: 60, zIndex: 200 }}
              >
                <GooglePlacesAutocomplete
                  placeholder="Search"
                  fetchDetails={true}
                  onPress={(data, details = null) => {
                    console.log(data);
                    console.log(details);
                    setPickup({
                      address: data.description,
                      latitude: `${details?.geometry.location.lat}`,
                      longitude: `${details?.geometry.location.lng}`,
                    });
                  }}
                  query={{
                    key: 'AIzaSyBWXW1Mq7vb6wIIfdHFEzp9xuknlomPJkg',
                    language: 'en',
                    components: 'country:za',
                  }}
                  textInputProps={{
                    placeholder: 'Pickup Location',
                  }}
                  enablePoweredByContainer={false}
                  styles={{
                    container: {
                      zIndex: 20,
                      flex: 0,
                      width: '100%',
                      position: 'absolute',
                    },
                    textInput: {
                      borderWidth: 1,
                      borderColor: '#808080',
                      borderRadius: 25,
                      paddingLeft: 20,
                    },
                  }}
                />
              </View>
              <View style={{ flex: 1, marginHorizontal: 3, width: '100%' }}>
                <Pressable onPress={() => bookRide(tripId)}>
                  <View
                    style={[
                      styles.flexRow,
                      {
                        backgroundColor: '#188aed',
                        borderWidth: 2,
                        borderRadius: 50,
                        borderColor: '#188aed',
                        padding: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: '600',
                        fontSize: 13,
                      }}
                    >
                      Book
                    </Text>
                  </View>
                </Pressable>
              </View>
              <View style={{ flex: 1, marginHorizontal: 3, width: '100%' }}>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <View
                    style={[
                      styles.flexRow,
                      {
                        backgroundColor: '#ff0000',
                        borderWidth: 2,
                        borderRadius: 50,
                        borderColor: '#ff0000',
                        padding: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: '600',
                        fontSize: 13,
                      }}
                    >
                      Cancel
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal> */}
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
                type={type}
                onPress={() => bookRide(tripId)}
                onPressStart={() => startTripHandle(trip.tripId)}
                onPressUser={() =>
                  navigation.navigate('DriverProfile', {
                    driverId: trip.driver.id,
                  })
                }
                chat={() => openChat(userData.id, trip.driver.id)}
                userId={userData ? userData.id : ''}
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    height: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 30,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default TripDetails;
