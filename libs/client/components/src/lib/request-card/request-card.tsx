import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { formatDate, getTime, colors } from '@carpool/client/shared/utilities';
import { TripRequestType } from '@carpool/client/store';

const { blue, black, grey, lightGrey, white } = colors;

type props = {
  trip: TripRequestType;
  onPressAccept: () => void;
  onPressDecline: () => void;
};

export function RequestCard({ trip, onPressAccept, onPressDecline }: props) {
  return (
    <View style={[styles.card, styles.shadow]}>
      <View style={[styles.flexRow, { marginBottom: 5 }]}>
        <View style={[styles.flexRow, { flex: 1, marginRight: 0 }]}>
          <Image
            source={require('./lighter_grey.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={[styles.flexColumn, { flex: 5 }]}>
          <Text style={[styles.day, { paddingLeft: 20 }]} numberOfLines={1}>
            {trip.user.name} {trip.user.surname}
          </Text>
          <Text style={[styles.date, { paddingLeft: 20 }]}>
            {formatDate(trip.trip.tripDate)}
          </Text>
        </View>
        <View>
          <Text style={{ color: black }}>{getTime(trip.trip.tripDate)}</Text>
        </View>
      </View>
      <View style={styles.flexColumn}>
        <View style={[styles.flexRow, { paddingVertical: 8 }]}>
          <View
            style={{
              flex: 1,
            }}
          >
            <Icon
              name="circle"
              size={10}
              style={{
                textAlign: 'center',
                color: blue,
              }}
            />
          </View>
          <Text
            style={{
              flex: 10,
              color: grey,
              paddingLeft: 10,
            }}
            numberOfLines={1}
          >
            {trip.trip.coordinates[0].address}
          </Text>
        </View>
        <View
          style={[styles.flexRow, { paddingVertical: 8, paddingBottom: 0 }]}
        >
          <View
            style={{
              flex: 1,
              borderRadius: 50,
              backgroundColor: lightGrey,
            }}
          >
            <Icon
              name="circle"
              size={10}
              style={{
                textAlign: 'center',
                paddingHorizontal: 2,
                paddingVertical: 8,
                borderRadius: 50,
                color: blue,
              }}
            />
          </View>
          <Text
            style={{
              flex: 10,
              color: grey,
              paddingLeft: 10,
            }}
            numberOfLines={1}
          >
            {trip.trip.coordinates[1].address}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => onPressAccept()}
            style={styles.container2}
          >
            <Text style={styles.text}>Accept</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => onPressDecline()}
            style={styles.container2}
          >
            <Text style={styles.text}>Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container2: {
    backgroundColor: '#282D46',
    width: '100%',
    padding: 12,
    paddingVertical: 8,
    borderRadius: 25,
  },
  text: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
  card: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
    marginVertical: 10,
    backgroundColor: white,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 4,
    borderWidth: 3,
    borderColor: '#188aed',
  },
  day: {
    maxWidth: '75%',
    textAlign: 'left',
    color: black,
    fontSize: 15,
    fontWeight: '700',
  },
  date: {
    color: blue,
    fontSize: 12,
  },
  shadow: {
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default RequestCard;
