import React, { useRef } from 'react';

import { Button, HomeMapView } from '@carpool/client/components';

import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

import { AcceptRequestProps } from '../NavigationTypes/navigation-types';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';

import { TripDetailsType } from '@carpool/client/store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GOOGLE_MAPS_APIKEY = 'AIzaSyChxxl-UlhNAXjKJp2cYcrG5l6yEo9qcng';

type props = {
  trip: TripDetailsType;
};

export function AcceptRequest(
  { navigation }: AcceptRequestProps,
  { trip }: props
) {
  const { width, height } = Dimensions.get('window');

  const mapView = useRef<MapView>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexColumn}>
        <View style={{ display: 'flex', flex: 0.15}} />
        <Icon
          name="arrow-left"
          size={35}
          style={{ color: '#808080' }}
          onPress={() => navigation.goBack()}
        />
        <View style={{ display: 'flex', flex: 0.8, justifyContent: 'center' }}>
          <Text
            style={{
              marginTop: 10,

              textAlign: 'center',

              fontSize: 24,

              fontWeight: '700',
            }}
          >
            Passenger Name
          </Text>

          <Text
            style={{
              textAlign: 'center',

              fontSize: 18,

              fontWeight: '400',

              color: '#808080',

              marginTop: 8,

              marginBottom: 10,

              lineHeight: 20,
            }}
          >
            Rating: 4.5
          </Text>

          <Text
            style={{ textAlign: 'center', fontSize: 16, fontWeight: '700' }}
          >
            Pickup:{' '}
            {
              //trip.pickup

              'Eco Lake, Tamarillo Street, Eco-Park Estate, Centurion, South Africa'
            }
          </Text>

          <View style={{ marginTop: 10 }} />

          <Text
            style={{
              textAlign: 'center',

              fontSize: 16,

              fontWeight: '700',

              marginBottom: 10,
            }}
          >
            Dropoff:{' '}
            {
              //trip.dropoff

              'University of Pretoria, Lynnwood Rd, Hatfield, Pretoria, South Africa'
            }
          </Text>
        </View>

        <View style={{ marginBottom: 20 }} />

        <View
          style={{
            flex: 2.5,

            marginTop: 10,
          }}
        >
          <MapView
            initialRegion={{
              latitude: -25.8858077,

              longitude: 28.1760277,

              latitudeDelta: 0.05,

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
                latitude: parseFloat('-25.8858077'),

                longitude: parseFloat('28.1760277'),
              }}
              pinColor="#188aed"
            />

            <Marker
              coordinate={{
                latitude: parseFloat('-25.7545492'),

                longitude: parseFloat('28.2314476'),
              }}
              pinColor="#188aed"
            />

            {
              //trip.coordinates.length

              2 >= 2 && (
                <MapViewDirections
                  origin={{
                    latitude: parseFloat('-25.8858077'),

                    longitude: parseFloat('28.1760277'),
                  }}
                  destination={{
                    latitude: parseFloat('-25.7545492'),

                    longitude: parseFloat('28.2314476'),
                  }}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={3}
                  strokeColor="#188aed"
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
                />
              )
            }
          </MapView>
        </View>

        {/* <Image
  
        source={require('../assets/title.png')}
  
        style={{ resizeMode: 'cover' }}
  
       /> */}

        <View
          style={{
            flex: 1,

            justifyContent: 'flex-end',

            marginBottom: 10,

            display: 'flex',

            flexDirection: 'column',
          }}
        >
          <View style={{ marginVertical: 10 }}>
            <Button
              title="Accept"
              onPress={() => navigation.push('LoginPage')}
            />
          </View>

          <Button
            colour="#282D46"
            title="Decline"
            onPress={() => navigation.push('SignUpPage')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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

export default AcceptRequest;
