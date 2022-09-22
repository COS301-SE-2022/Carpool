import React, { useRef } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { TripDetailsType } from '@carpool/client/store';
import { styles } from './passenger-active-trip-mapview-styles.style';
import Toast from 'react-native-toast-message';

type props = {
  trip: TripDetailsType;
};

export function PassengerActiveTripMapview() {
  const trip = {
    coordinates: [
      {
        address:
          'Eco Lake, Tamarillo Street, Eco-Park Estate, Centurion, South Africa',
        latitude: '-25.8858077',
        longitude: '28.1760277',
      },
      {
        address:
          'University of Pretoria, Lynnwood Rd, Hatfield, Pretoria, South Africa',
        latitude: '-25.7545492',
        longitude: ' 28.2314476',
      },
    ],
    createdAt: '2022-09-21T12:45:14.385Z',
    driver: {
      id: 'cl8bmb8wg00003kt0oii647ar',
      name: 'Benjamin',
      profilePic: '',
      surname: 'Osmers',
    },
    passengers: [
      {
        userId: 'cl8bmbbdj00073kt0jz6pnomc',
      },
      {
        userId: 'cl8bmbcaq00143kt0wkrf9de5',
      },
    ],
    price: 30,
    seatsAvailable: 3,
    status: 'confirmed',
    tripDate: '2022-09-22T12:45:14.380Z',
    tripId: 'cl8bmbd3l00213kt0oiopygqv',
  };

  const GOOGLE_MAPS_APIKEY = 'AIzaSyBWXW1Mq7vb6wIIfdHFEzp9xuknlomPJkg';

  const { width, height } = Dimensions.get('window');

  const mapView = useRef<MapView>(null);

  const showToast = (message: string) => {
    Toast.show({
      type: 'error',
      position: 'top',
      text1: message,
    });
  };

  return (
    <View
      style={[
        styles.flexRow,
        trip.status === 'active' ? newStyles.flexStyle2 : newStyles.flexStyle1,
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
  );
}

const newStyles = StyleSheet.create({
  flexStyle1: {
    flex: 2.5,
  },
  flexStyle2: {
    flex: 9,
  },
});

export default PassengerActiveTripMapview;
