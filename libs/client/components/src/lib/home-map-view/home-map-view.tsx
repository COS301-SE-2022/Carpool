import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from './home-map-view.style';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from 'react-native-geolocation-service';
// import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYmVuamFtaW4wMDciLCJhIjoiY2w2eHI0NGdjMDNpMjNlbXhucnN6cXdqcSJ9.NolfdosGYO3rXi58vcPn3g'
);

export function HomeMapView() {
  const accessToken =
    'pk.eyJ1IjoiYmVuamFtaW4wMDciLCJhIjoiY2w2eHI0NGdjMDNpMjNlbXhucnN6cXdqcSJ9.NolfdosGYO3rXi58vcPn3g';
  // const directionsClient = MapboxDirectionsFactory({ accessToken });

  MapboxGL.setTelemetryEnabled(true);

  const [coordinates, setCoordinates] = useState([
    8.674252499999994, 9.0845755,
  ]);

  // const [geometry, setGeometry] = useState({});

  useEffect(() => {
    Geolocation.requestAuthorization('whenInUse');

    Geolocation.getCurrentPosition(
      async (position) => {
        const coordArr = [position.coords.longitude, position.coords.latitude];
        setCoordinates(coordArr);

        // console.log(coordinates);

        // const reqOptions = {
        //   waypoints: [
        //     { coordinates: coordinates },
        //     { coordinates: [28.1613571, -25.8487678] },
        //   ],
        //   profile: 'driving',
        //   geometries: 'geojson',
        // };
        // const res = await directionsClient.getDirections(reqOptions).send();
        // console.log('Route: ', res);

        // setGeometry(res.body.routes[0].geometry);
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
      >
        <MapboxGL.Camera zoomLevel={10} centerCoordinate={coordinates} />
        <MapboxGL.PointAnnotation
          id="pointAnnotation"
          coordinate={coordinates}
        />
        <MapboxGL.UserLocation visible={true} />
      </MapboxGL.MapView>

      {/* <MapboxGL.MapView
        style={{ flex: 1, zIndex: -10 }}
        styleURL="mapbox://styles/benjamin007/cl82we535001a14p7xvj0d49j"
        logoEnabled={false}
      >
        <MapboxGL.ShapeSource id="routeSource" shape={geometry}>
          <MapboxGL.LineLayer
            id="routeFill"
            style={{
              lineColor: '#188aed',
              lineWidth: 3.2,
            }}
          />
        </MapboxGL.ShapeSource>
        <MapboxGL.UserLocation visible={true} />
        <MapboxGL.Camera
          zoomLevel={10}
          centerCoordinate={[coordinates[0], coordinates[1]]}
          animationMode="flyTo"
          animationDuration={1200}
        />
      </MapboxGL.MapView> */}
    </View>
  );
}

export default HomeMapView;
