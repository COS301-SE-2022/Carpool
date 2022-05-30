/* eslint-disable-next-line */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  formatDate,
  getTime,
  getDay,
  colors,
} from '@carpool/client/shared/utilities';

type cardProps = {
  startLocation: string;
  destination: string;
  date: string;
  type: string;
  onPress: () => void;
};

const { blue, black, grey, lightGrey, white } = colors;

export function TripCardSmall({
  startLocation,
  destination,
  date,
  type,
  onPress,
}: cardProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, styles.shadow]}>
        <View style={[styles.flexRow, { marginBottom: 5 }]}>
          <View style={[styles.flexRow, { flex: 1, marginRight: 0 }]}>
            <Icon
              name={
                type === 'passenger'
                  ? 'directions-run'
                  : type === 'driver'
                  ? 'directions-car'
                  : ''
              }
              size={25}
              style={{ color: blue }}
            />
          </View>
          <View style={[styles.flexColumn, { flex: 5 }]}>
            <Text style={styles.day} numberOfLines={1}>
              {getDay(date)}
            </Text>
            <Text style={styles.date}>{formatDate(date)}</Text>
          </View>
          <View>
            <Text style={{ color: black }}>{getTime(date)}</Text>
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
              {startLocation}
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
              {destination}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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

export default TripCardSmall;
