/* eslint-disable-next-line */
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Button } from '@carpool/client/components';
import { SearchProps } from '../NavigationTypes/navigation-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DatePicker from 'react-native-date-picker';
import Geolocation from '@react-native-community/geolocation';

// navigator.geolocation = require('@react-native-community/geolocation');

// Geolocation.getCurrentPosition((info) => {
//   console.log(info);
// });

/* eslint-disable-next-line */
// navigator.geolocation = Geolocation;

// navigator.geolocation = require('@react-native-community/geolocation');

export function SearchPage({ navigation }: SearchProps) {
  type address = {
    address: string;
    latitude: string;
    longitude: string;
  };

  const [currentLocation, setCurrentLocation] = useState({});

  type reqionType = {
    latitude: string;
    longitude: string;
  };

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [origin, setOrigin] = useState({} as address);
  const [destination, setDestination] = useState({} as address);

  const [region, setRegion] = useState({});

  const search = () => {
    alert(
      `${origin.address} to ${destination.address} on ${date.toISOString()}`
    );
  };

  const logDate = (date: Date) => {
    console.log(date.toISOString());
  };

  useEffect(() => {
    navigator.geolocation = Geolocation;
  }, []);

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
          currentLocation={true}
          currentLocationLabel="Current Location"
          nearbyPlacesAPI="GoogleReverseGeocoding"
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
              marginTop: 10,
            },
          }}
        />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 30,
        }}
      >
        <Button title="Open" onPress={() => setOpen(true)} />
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
        <Button onPress={search} title="Search" />
      </View>
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

export default SearchPage;
