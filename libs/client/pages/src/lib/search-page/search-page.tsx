/* eslint-disable-next-line */
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Pressable } from 'react-native';
import { Button } from '@carpool/client/components';
import { SearchPageProps } from '../NavigationTypes/navigation-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DatePicker from 'react-native-date-picker';
import { formatDate } from '@carpool/client/shared/utilities';

export function SearchPage({ navigation }: SearchPageProps) {
  type address = {
    address: string;
    latitude: string;
    longitude: string;
  };

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [origin, setOrigin] = useState({} as address);
  const [destination, setDestination] = useState({} as address);

  const search = () => {
    navigation.navigate('SearchResults', {
      date: date.toISOString(),
      startLongitude: origin.longitude,
      startLatitude: origin.latitude,
      destinationLongitude: destination.longitude,
      destinationLatitude: destination.latitude,
    });
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
          marginTop: 10,
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
          mode="date"
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
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
