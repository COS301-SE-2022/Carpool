import React, { useRef } from 'react';
import { View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { TripDetailsType } from '@carpool/client/store';
import { styles } from './trip-details-map-view.style';
import Toast from 'react-native-toast-message';

type props = {
  trip: TripDetailsType;
};

export function TripDetailsMapView({ trip }: props) {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyChxxl-UlhNAXjKJp2cYcrG5l6yEo9qcng';

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
        {
          flex: 2.5,
        },
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

export default TripDetailsMapView;
