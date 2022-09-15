import React, { useState } from 'react';
import { MapboxTestProps } from '../NavigationTypes/navigation-types';
import { View, StyleSheet, Text, Image } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYmVuamFtaW4wMDciLCJhIjoiY2w2eHI0NGdjMDNpMjNlbXhucnN6cXdqcSJ9.NolfdosGYO3rXi58vcPn3g'
);

export function MapboxTest({ navigation }: MapboxTestProps) {
  const [coordinates] = useState([8.674252499999994, 9.0845755]);
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.Camera zoomLevel={6} centerCoordinate={coordinates} />
          <MapboxGL.PointAnnotation
            id="pointAnnotation"
            coordinate={coordinates}
          />
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
