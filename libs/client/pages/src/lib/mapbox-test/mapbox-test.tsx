import React, { useState, useEffect } from 'react';
import { MapboxTestProps } from '../NavigationTypes/navigation-types';
import { View, StyleSheet, Text, Image } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from 'react-native-geolocation-service';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYmVuamFtaW4wMDciLCJhIjoiY2w2eHI0NGdjMDNpMjNlbXhucnN6cXdqcSJ9.NolfdosGYO3rXi58vcPn3g'
);

export function MapboxTest({ navigation }: MapboxTestProps) {
  const [coordinates, setCoordinates] = useState([
    8.674252499999994, 9.0845755,
  ]);

  useEffect(() => {
    Geolocation.requestAuthorization('whenInUse');

    Geolocation.getCurrentPosition(
      (position) => {
        const coordArr = [position.coords.longitude, position.coords.latitude];
        setCoordinates(coordArr);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL="mapbox://styles/benjamin007/cl82we535001a14p7xvj0d49j"
          zoomEnabled={true}
        >
          <MapboxGL.Camera zoomLevel={6} centerCoordinate={coordinates} />
          <MapboxGL.PointAnnotation
            id="pointAnnotation"
            coordinate={coordinates}
          />
          <MapboxGL.UserLocation visible={true} />
        </MapboxGL.MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapboxTest;
