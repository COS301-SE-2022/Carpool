import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { formatDateFull, getTime } from '@carpool/client/shared/utilities';
import { TripDetailsType } from '@carpool/client/store';
import { styles } from './trip-details-icons.style';

type props = {
  trip: TripDetailsType;
};

export function TripDetailsIcons({ trip }: props) {
  return (
    <View style={[styles.flexRow, styles.iconRow]}>
      <View style={[styles.flexRow, styles.iconContainer]}>
        <Icons
          name="attach-money"
          size={15}
          style={{ marginRight: 5 }}
          color="#188aed"
        />
        <Text style={styles.textMediumBlack}>R{trip && trip.price}</Text>
      </View>
      <View
        style={[
          styles.flexRow,
          styles.iconContainer,
          {
            flexGrow: 1,
          },
        ]}
      >
        {trip &&
          [...Array(trip.seatsAvailable)].map((x, i) => (
            <Icons key={i} name="person" size={15} color="#188aed" />
          ))}
        <Text style={styles.textMediumBlack}>
          {trip && trip.seatsAvailable} Seats
        </Text>
      </View>
      <View style={[styles.flexRow, styles.iconContainer]}>
        <Icon
          name="calendar"
          size={15}
          color="#188aed"
          style={{ marginRight: 5 }}
        />
        <Text style={styles.textMediumBlack}>
          {trip && formatDateFull(trip.tripDate)}
        </Text>
      </View>
      <View
        style={[
          styles.flexRow,
          {
            padding: 10,
          },
        ]}
      >
        <Icon
          name="clock"
          size={15}
          style={{ marginRight: 5 }}
          color="#188aed"
        />
        <Text style={styles.textMediumBlack}>
          {trip && getTime(trip.tripDate)}
        </Text>
      </View>
    </View>
  );
}

export default TripDetailsIcons;
