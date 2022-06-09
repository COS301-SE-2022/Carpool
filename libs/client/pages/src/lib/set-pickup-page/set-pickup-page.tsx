import React, { useState } from 'react';
import { SetPickupPageProps } from '../NavigationTypes/navigation-types';
import { View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '@carpool/client/components';

export function SetPickupPage({ navigation, route }: SetPickupPageProps) {
  type address = {
    address: string;
    latitude: string;
    longitude: string;
  };

  const { tripId, passengerId, seatsBooked, status, price } = route.params;

  const [pickup, setPickup] = useState({} as address);

  const submitHandler = () => {
    console.log({
      tripId,
      passengerId,
      seatsBooked,
      status,
      price,
      pickup,
    });

    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 30 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 15,
        }}
      >
        <Icon
          name="close-circle"
          size={22}
          style={{ flex: 2, color: '#808080' }}
          onPress={() => navigation.goBack()}
        />
        <Text style={{ fontWeight: '700', fontSize: 20, flex: 6 }}>
          Search for trips
        </Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'column' }}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log('Hello');
            console.log(data, details);
            setPickup({
              address: data.description,
              latitude: `${details?.geometry.location.lat}`,
              longitude: `${details?.geometry.location.lng}`,
            });
          }}
          // currentLocation={true}
          // currentLocationLabel="Current Location"
          // nearbyPlacesAPI="GoogleReverseGeocoding"
          query={{
            key: 'AIzaSyChxxl-UlhNAXjKJp2cYcrG5l6yEo9qcng',
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
      <View style={{ marginTop: 30 }}>
        <Button onPress={submitHandler} title="Submit" />
      </View>
    </View>
  );
}

export default SetPickupPage;
