import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from './home-map-view.style';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from 'react-native-geolocation-service';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYmVuamFtaW4wMDciLCJhIjoiY2w2eHI0NGdjMDNpMjNlbXhucnN6cXdqcSJ9.NolfdosGYO3rXi58vcPn3g'
);

export function HomeMapView() {
  MapboxGL.setTelemetryEnabled(true);

  const [coordinates, setCoordinates] = useState([
    8.674252499999994, 9.0845755,
  ]);

  useEffect(() => {
    Geolocation.requestAuthorization('whenInUse');

    Geolocation.getCurrentPosition(
      async (position) => {
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
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        styleURL="mapbox://styles/benjamin007/cl82we535001a14p7xvj0d49j"
        logoEnabled={false}
      >
        <MapboxGL.Camera zoomLevel={10} centerCoordinate={coordinates} />
        <MapboxGL.UserLocation visible={true} />
      </MapboxGL.MapView>
    </View>
  );
}

export default HomeMapView;
