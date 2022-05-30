import React from 'react';
import { Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { Button } from '@carpool/client/components';
import { styles } from './trip-details-bottom-container.style';
import { TripDetailsType } from '@carpool/client/store';

type props = {
  trip: TripDetailsType;
  onPress: () => void;
};

export function TripDetailsBottomContainer({ trip, onPress }: props) {
  return (
    <View style={[styles.flexCol, styles.userContainer]}>
      <View
        style={[
          styles.flexRow,
          {
            flex: 1,
          },
        ]}
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
            <Text style={styles.textMediumLight}>Last trip: 1 April 2022</Text>
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
        <View style={[styles.shadow, styles.chatButton]}>
          <Icons name="chat-bubble" color="#188aed" size={25} />
        </View>
      </View>
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
    </View>
  );
}

export default TripDetailsBottomContainer;
