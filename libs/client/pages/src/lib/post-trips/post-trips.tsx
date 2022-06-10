import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { Button } from '@carpool/client/components';
import { PostTripsProps } from '../NavigationTypes/navigation-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DatePicker from 'react-native-date-picker';
import { createTrip, RootStore, AppDispatch } from '@carpool/client/store';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from '@carpool/client/components';
import { formatDate } from '@carpool/client/shared/utilities';
import Toast from 'react-native-toast-message';

/* eslint-disable-next-line */

export function PostTrips({ navigation }: PostTripsProps) {
  type address = {
    address: string;
    latitude: string;
    longitude: string;
  };

  const dispatch: AppDispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [price, setPrice] = useState('');
  const [seats, setSeats] = useState('');

  const [origin, setOrigin] = useState({} as address);
  const [destination, setDestination] = useState({} as address);

  const showToast = (message: string) => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: message,
      topOffset: 300,
    });
  };

  const logDate = (date: Date) => {
    console.log(date.toISOString());
  };

  const userState = useSelector((state: RootStore) => state.user);
  const { user } = userState;

  const createTripState = useSelector((state: RootStore) => state.createdTrip);
  const { trip, status } = createTripState;

  const confirmTrip = () => {
    console.log('Confirming New Trip');

    dispatch(
      createTrip({
        driver: user ? user.id : '',
        tripDate: date.toISOString(),
        price: price,
        seatsAvailable: seats,
        startLocationAddress: origin.address,
        startLocationLongitude: origin.longitude,
        startLocationLatitude: origin.latitude,
        destinationAddress: destination.address,
        destinationLongitude: destination.longitude,
        destinationLatitude: destination.latitude,
      })
    );

    showToast('Trip created successfully');
    navigation.navigate('HomePage');
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 30, paddingVertical: 60 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Icon
          name="arrow-left"
          size={22}
          style={{ flex: 2.5, color: '#808080' }}
          onPress={() => navigation.goBack()}
        />
        <Text style={{ fontWeight: '700', fontSize: 20, flex: 6 }}>
          Create trips
        </Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Input
          onChangeText={setPrice}
          inputValue={price}
          inputPlaceholder="Price"
          iconName="account-cash"
        />
        <Input
          onChangeText={setSeats}
          inputValue={seats}
          inputPlaceholder="Seats"
          iconName="account"
        />
      </View>
      {status === 'loading' ? (
        <ActivityIndicator />
      ) : (
        <>
          <View style={styles.locationDetailsContainer}>
            <GooglePlacesAutocomplete
              placeholder="Search"
              fetchDetails={true}
              onPress={(data, details = null) => {
                console.log('Hello');
                console.log(data, details);
                setOrigin({
                  address: data.description,
                  latitude: `${details?.geometry.location.lat}`,
                  longitude: `${details?.geometry.location.lng}`,
                });
              }}
              query={{
                key: 'AIzaSyChxxl-UlhNAXjKJp2cYcrG5l6yEo9qcng',
                language: 'en',
                components: 'country:za',
              }}
              textInputProps={{
                placeholder: 'Start Location',
              }}
              enablePoweredByContainer={false}
              styles={{
                container: {
                  zIndex: 20,
                  flex: 0,
                },
                textInput: {
                  borderWidth: 1,
                  borderColor: '#808080',
                  borderRadius: 25,
                  paddingLeft: 20,
                },
              }}
            />

            <GooglePlacesAutocomplete
              placeholder="Search"
              fetchDetails={true}
              onPress={(data, details = null) => {
                console.log('Hello');
                console.log(data, details);
                setDestination({
                  address: data.description,
                  latitude: `${details?.geometry.location.lat}`,
                  longitude: `${details?.geometry.location.lng}`,
                });
              }}
              query={{
                key: 'AIzaSyChxxl-UlhNAXjKJp2cYcrG5l6yEo9qcng',
                language: 'en',
                components: 'country:za',
              }}
              textInputProps={{
                placeholder: 'Destination',
              }}
              enablePoweredByContainer={false}
              styles={{
                container: {
                  zIndex: 20,
                  flex: 0,
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
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 2,
            }}
          >
            <Pressable
              style={{
                borderWidth: 1,
                borderColor: '#808080',
                width: '100%',
                paddingVertical: 12,
                paddingHorizontal: 20,
                borderRadius: 25,
              }}
              onPress={() => setOpen(true)}
            >
              <Text>{formatDate(date.toISOString())}</Text>
            </Pressable>
            <DatePicker
              modal
              open={open}
              date={date}
              onConfirm={(date) => {
                setOpen(false);
                setDate(date);
                logDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
          <View style={{ marginTop: 30 }}>
            <Button onPress={confirmTrip} title="Confirm" />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  locationShow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 30,
    marginTop: 15,
    width: '100%',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#808080',
    fontWeight: '600',
  },
  locationDetailsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default PostTrips;
