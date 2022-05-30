import React from 'react';
import { Text, View } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { TripDetailsType } from '@carpool/client/store';
import { styles } from './trip-details-locations.style';

type props = {
  trip: TripDetailsType;
};

export function TripDetailsLocations({ trip }: props) {
  return (
    <View
      style={[
        styles.flexRow,
        {
          flex: 2,
          padding: 20,
        },
      ]}
    >
      <View
        style={[
          styles.flexRow,
          {
            width: '100%',
          },
        ]}
      >
        <View
          style={[
            styles.flexCol,
            {
              flex: 1,
              alignItems: 'center',
            },
          ]}
        >
          <Icons name="my-location" style={styles.startIcon} size={22} />
          <View style={styles.line}></View>
          <Icons name="location-searching" style={styles.endIcon} size={22} />
        </View>
        <View
          style={[
            styles.flexCol,
            {
              flex: 9,
              paddingLeft: 10,
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text>Start Location</Text>
            <Text style={styles.textLargeBlack} numberOfLines={1}>
              {trip && trip.coordinates[0].address}
            </Text>
          </View>
          <View style={{ flex: 1, marginBottom: -20 }}>
            <Text>Destination</Text>
            <Text numberOfLines={1} style={styles.textLargeBlack}>
              {trip && trip.coordinates[1].address}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default TripDetailsLocations;
