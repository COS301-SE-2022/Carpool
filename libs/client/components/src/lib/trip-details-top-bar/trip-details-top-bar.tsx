import React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TripDetailsType } from '@carpool/client/store';
import { formatDate } from '@carpool/client/shared/utilities';
import { styles } from './trip-details-top-bar.style';
import Icons from 'react-native-vector-icons/MaterialIcons';

type props = {
  trip: TripDetailsType;
  onPress: () => void;
};

export function TripDetailsTopBar({ trip, onPress }: props) {
  const cancel = (tripId: string) => {
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
          //{
          onPress: onPress,
          //navigation.navigate('RegisterDriver', {
          //  userId: userData ? userData.id : '',
          //});
          // navigation.navigate('OnboardPage');
          //},
        },
      ]
    );
    // if (trip.status === 'active') {
    //   if (trip.driver.id === userData?.id) {
    //     //**Driver active screen */
    //     navigation.navigate('DriverActiveTrip', { tripId });
    //   } else {
    //     //** Passenger active screen */
    //     navigation.navigate('DriverActiveTrip', { tripId });
    //   }
    // } else {
    //   navigation.push('TripDetails', { tripId, type: 'booked' });
    // }
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
      {/* <Pressable>
        <View style={[styles.shadow, styles.cancelButton]}>
          <Icons name="cancel" color="#000000" size={30} onPress={cancel}/>
        </View>
      </Pressable> */}
    </View>
  );
}

export default TripDetailsTopBar;
