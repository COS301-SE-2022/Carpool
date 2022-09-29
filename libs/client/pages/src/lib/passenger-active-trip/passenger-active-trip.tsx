import React, { useRef } from 'react';

import { Text, SafeAreaView, View, StyleSheet, Dimensions } from 'react-native';

import { PassengerActiveTripProps } from '../NavigationTypes/navigation-types';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';

import { TripDetailsType } from '@carpool/client/store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const GOOGLE_MAPS_APIKEY = 'AIzaSyChxxl-UlhNAXjKJp2cYcrG5l6yEo9qcng';

type props = {
  trip: TripDetailsType;
};

export function PassengerActiveTrip(
  { navigation }: PassengerActiveTripProps,
  { trip }: props
) {
  const { width, height } = Dimensions.get('window');

  const mapView = useRef<MapView>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexColumn}>
        <View style={{ display: 'flex', flex: 0.05 }} />
        <Icon
          name="arrow-left"
          size={35}
          style={{ color: '#808080' }}
          onPress={() => navigation.goBack()}
        />
        <View
          style={{
            display: 'flex',
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              marginTop: 10,

              textAlign: 'center',

              fontSize: 24,

              fontWeight: '700',

              textDecorationLine: 'underline',
            }}
          >
            Active Trip
          </Text>

          <Text
            style={{
              textAlign: 'center',

              fontSize: 20,

              fontWeight: '900',

              color: '#808080',

              marginTop: 8,

              marginBottom: 20,

              lineHeight: 20,
            }}
          >
            1 of 2 options
          </Text>
        </View>

        <View style={{ marginBottom: 20 }} />

        <View
          style={{
            flex: 4,

            marginTop: 5,
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

            backgroundColor: '#188AEC',

            marginTop: 20,

            marginBottom: 10,

            borderRadius: 10,
          }}
        >
          <Text style={styles.bottom}>Driver Name</Text>

          <Text style={styles.bottom}>Rating: 4.5</Text>

          <Text style={styles.bottom}>Toyota Prius KJH-876</Text>
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

  container2: {
    flex: 1,

    padding: 20,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  bottom: {
    textAlign: 'center',

    fontSize: 20,

    fontWeight: '800',

    color: 'white',

    marginTop: 10,

    marginBottom: 5,

    lineHeight: 20,
  },
});

const styles2 = StyleSheet.create({
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
  topBar: {
    backgroundColor: '#188aed',
    flex: 0.9,
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
});

export default PassengerActiveTrip;
