import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TripDetailsType } from '@carpool/client/store';
import { formatDate } from '@carpool/client/shared/utilities';
import { styles } from './trip-details-top-bar.style';

type props = {
  trip: TripDetailsType;
  onPress: () => void;
};

export function TripDetailsTopBar({ trip, onPress }: props) {
  return (
    <View style={[styles.shadow, styles.flexRow, styles.topBar]}>
      <Icon
        name="arrow-left"
        size={22}
        style={{ color: '#fff', flex: 1 }}
        onPress={onPress}
      />
      <View style={{ flex: 4 }}>
        <Text style={styles.textLargeWhite}>
          {trip && formatDate(trip.tripDate)}
        </Text>
        <Text style={styles.textSmallWhite} numberOfLines={2}>
          Trip to {trip && trip.coordinates[0].address}
        </Text>
      </View>
    </View>
  );
}

export default TripDetailsTopBar;
