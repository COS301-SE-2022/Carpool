/* eslint-disable-next-line */
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';

type cardProps = {
  tripId: string;
  driver: string;
  startLocation: string;
  destination: string;
  created: string;
  image: string;
  date: string;
  distance: string;
  onPress: () => void;
};

export function TripCard({
  tripId,
  driver,
  startLocation,
  destination,
  created,
  image,
  date,
  distance,
  onPress,
}: cardProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={[styles.flexRow, { justifyContent: 'flex-start' }]}>
          <View
            style={[
              styles.flexRow,
              { justifyContent: 'flex-start', flex: 1, marginRight: 10 },
            ]}
          >
            <Image
              source={require('./lighter_grey.png')}
              resizeMode="contain"
              style={{
                width: 40,
                height: 40,
                borderRadius: 25,
                marginRight: 15,
              }}
            />
          </View>
          <View style={{ display: 'flex', flexDirection: 'column', flex: 5 }}>
            <Text
              style={[styles.nameText, { maxWidth: '75%', textAlign: 'left' }]}
              numberOfLines={1}
            >
              {driver}
            </Text>
            <View style={[styles.flexRow, { justifyContent: 'flex-start' }]}>
              <Icon name="star" size={18} color="#FACC15" />
              <Icon name="star" size={18} color="#FACC15" />
              <Icon name="star" size={18} color="#FACC15" />
              <Icon name="star" size={18} color="#FACC15" />
              <Icon name="star-half-full" size={18} color="#FACC15" />
            </View>
          </View>
        </View>
        <View style={styles.locationDetailsContainer}>
          <View style={styles.locationShow}>
            <View
              style={[
                styles.flexRow,
                {
                  alignSelf: 'flex-start',
                  flex: 5,
                  justifyContent: 'flex-start',
                },
              ]}
            >
              <Icon
                style={[styles.text, { marginRight: 8 }]}
                name="location-on"
                size={25}
              />
              <Text
                style={[styles.text, { fontSize: 15, maxWidth: '75%' }]}
                numberOfLines={1}
              >
                {startLocation}
              </Text>
            </View>
            <Icon
              style={[styles.text, { marginRight: 8, color: '#188aed' }]}
              name="my-location"
              size={25}
            />
          </View>
          <View style={styles.locationShow}>
            <View
              style={[
                styles.flexRow,
                {
                  alignSelf: 'flex-start',
                  flex: 5,
                  justifyContent: 'flex-start',
                },
              ]}
            >
              <Icon
                style={[styles.text, { marginRight: 8 }]}
                name="location-on"
                size={25}
              />
              <Text
                style={[styles.text, { maxWidth: '75%' }]}
                numberOfLines={1}
              >
                {destination}
              </Text>
            </View>
            <Icon
              style={[styles.text, { marginRight: 8, color: '#188aed' }]}
              name="location-searching"
              size={25}
            />
          </View>
        </View>
        <View style={[styles.flexRow, { marginTop: 15, marginHorizontal: 3 }]}>
          <View>
            <Text style={{ color: '#808080' }}>{date}</Text>
          </View>
          <View>
            <Text style={{ color: '#808080' }}>{distance}km away</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 18,
    color: '#808080',
    fontWeight: '700',
  },
  locationShow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 30,
    marginTop: 15,
    width: '100%',
  },
  text: {
    color: '#808080',
    fontWeight: '600',
  },
  locationDetailsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  pickup: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 30,
    width: '40%',
    marginTop: 15,
    alignSelf: 'center',
  },
});

export default TripCard;
