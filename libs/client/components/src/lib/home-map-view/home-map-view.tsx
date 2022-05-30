import React, { useRef } from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { MapStyle } from './mapstyle';
import { styles } from './home-map-view.style';

export function HomeMapView() {
  const mapView = useRef<MapView>(null);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -25.8858077,
          longitude: 28.1760277,
          latitudeDelta: 0.05,
          longitudeDelta: 0,
        }}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        ref={mapView}
        customMapStyle={MapStyle}
        showsUserLocation={true}
        loadingEnabled={true}
        loadingBackgroundColor="#188aed"
      />
    </View>
  );
}

export default HomeMapView;
