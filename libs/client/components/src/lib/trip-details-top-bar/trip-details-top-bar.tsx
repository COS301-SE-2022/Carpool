import React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppDispatch, cancelDriverTrip, cancelPassengerTrip, TripDetailsType } from '@carpool/client/store';
import { formatDate } from '@carpool/client/shared/utilities';
import { styles } from './trip-details-top-bar.style';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';

type props = {
  tripId: string;
  userId: string;
  trip: TripDetailsType;
  onPress: () => void;
};

export function TripDetailsTopBar({ tripId, userId, trip, onPress }: props) {

  const dispatch: AppDispatch = useDispatch();

  const cancelCategory = () => {
    if (!(trip.status === 'active')) {
      if (trip.driver.id === userId) {
        //**Driver */
        dispatch(cancelDriverTrip({ 
          tripId: tripId,
        }));
      } else {
        //** Passenger */
        dispatch(cancelPassengerTrip({
          tripId: tripId,
          userId: userId,
        }));
      }
    } else {
      Alert.alert('You cannot cancel an active trip');
    }
  };

  const cancel = () => {
    Alert.alert(
      'You are about to cancel this trip.',
      'Are you sure you want to cancel?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            cancelCategory();
          }
        },
      ]
    );
  };

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
      <Pressable>
        <View style={[styles.shadow, styles.cancelButton]}>
          <Icons name="cancel" color="#ff0000" size={30} onPress={cancel}/>
        </View>
      </Pressable>
    </View>
  );
}

export default TripDetailsTopBar;
