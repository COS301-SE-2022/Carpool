import React, { useEffect } from 'react';
import {
  Image,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { Button } from '@carpool/client/components';
import { useSelector, useDispatch } from 'react-redux';
import { styles } from './trip-details-bottom-container.style';
import {
  TripDetailsType,
  RootStore,
  startTrip,
  AppDispatch,
} from '@carpool/client/store';

type props = {
  trip: TripDetailsType;
  type: string;
  userId: string;
  chat: () => void;
  onPress: () => void;
  onPressUser: () => void;
};

type Passenger = {
  userId: string;
};

export function TripDetailsBottomContainer({
  trip,
  type,
  onPress,
  onPressUser,
  userId,
  chat,
}: props) {
  console.log(trip);
  console.log(userId);

  return (
    <View style={[styles.flexCol, styles.userContainer]}>
      <View style={[styles.flexRow, { flex: 1 }]}>
        <Pressable
          style={[
            styles.flexRow,
            {
              flex: 12,
            },
          ]}
          onPress={onPressUser}
        >
          <View
            style={[
              styles.flexRow,
              {
                flex: 1,
                justifyContent: 'flex-start',
              },
            ]}
          >
            <Image
              source={require('./lighter_grey.png')}
              resizeMode="contain"
              style={styles.image}
            />
            <View>
              <Text
                style={[
                  styles.textLargeBlack,
                  {
                    marginBottom: 5,
                  },
                ]}
              >
                {trip && trip.driver.name} {trip && trip.driver.surname}
              </Text>
              <Text style={styles.textMediumLight}>
                Last trip: 1 April 2022
              </Text>
              <View style={styles.flexRow}>
                <Icon size={15} name="star" color="#FACC15" />
                <Icon size={15} name="star" color="#FACC15" />
                <Icon size={15} name="star" color="#FACC15" />
                <Icon size={15} name="star" color="#FACC15" />
                <Icon size={15} name="star" color="#FACC15" />
                <Text
                  style={[
                    styles.textMediumLight,
                    {
                      marginLeft: 5,
                      marginBottom: 0,
                    },
                  ]}
                >
                  5 ratings
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
        {trip.driver.id !== userId && (
          <Pressable
            onPress={chat}
            style={[styles.shadow, styles.chatButton, { flex: 1 }]}
          >
            <Icons name="chat-bubble" color="#188aed" size={25} />
          </Pressable>
        )}
      </View>
      {Number(trip.seatsAvailable) === 0 ? (
        <></>
      ) : trip.driver.id !== userId &&
        !trip.passengers.some(
          (passenger: Passenger) => passenger.userId === userId
        ) ? (
        <View
          style={[
            styles.flexCol,
            {
              flex: 1,
              justifyContent: 'flex-end',
            },
          ]}
        >
          <Button title="Book Ride" onPress={onPress} />
        </View>
      ) : (
        <></>
      )}
      {/* {trip.status !== 'active' &&
      trip.driver.id === userId &&
      trip.status !== 'completed' ? (
        <View
          style={[
            styles.flexCol,
            {
              flex: 1,
              justifyContent: 'flex-end',
            },
          ]}
        >
          <Button title="Start Trip" onPress={onPress} />
        </View>
      ) : (
        <></>
      )} */}
    </View>
  );
}

export default TripDetailsBottomContainer;
