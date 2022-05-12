/* eslint-disable-next-line */
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Button } from '@carpool/client/components';
import { SearchProps } from '../NavigationTypes/navigation-types';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native';

export function SearchPage({ navigation }: SearchProps) {
  return (
    <View style={{ flex: 1, padding: 30 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 15,
        }}
      >
        <Icon
          name="close-circle"
          size={22}
          style={{ flex: 2, color: '#808080' }}
          onPress={() => navigation.goBack()}
        />
        <Text style={{ fontWeight: '700', fontSize: 20, flex: 6 }}>
          Search for trips
        </Text>
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
            <Icons
              style={[styles.text, { marginRight: 8 }]}
              name="location-on"
              size={25}
            />
            <TextInput
              placeholder="Start Location"
              placeholderTextColor="#808080"
              style={{ fontWeight: '600' }}
            />
          </View>
          <Icons
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
            <Icons
              style={[styles.text, { marginRight: 8 }]}
              name="location-on"
              size={25}
            />
            <TextInput
              placeholder="Destination"
              placeholderTextColor="#808080"
              style={{ fontWeight: '600' }}
            />
          </View>
          <Icons
            style={[styles.text, { marginRight: 8, color: '#188aed' }]}
            name="location-searching"
            size={25}
          />
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 30,
        }}
      >
        <View
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#808080',
            borderRadius: 30,
            padding: 10,
            marginRight: 5,
          }}
        >
          <Icon
            name="calendar-today"
            size={20}
            style={{ flex: 1, color: '#808080' }}
          />
          <Text style={{ color: '#808080', flex: 3, fontWeight: '600' }}>
            Date
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#808080',
            borderRadius: 30,
            padding: 10,
            marginLeft: 5,
          }}
        >
          <Icon
            name="clock-time-one"
            size={20}
            style={{ flex: 1, color: '#808080' }}
          />
          <Text style={{ color: '#808080', flex: 3, fontWeight: '600' }}>
            Time
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 30 }}>
        <Button onPress={() => navigation.goBack()} title="Search" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#808080',
    fontWeight: '600',
  },
  locationDetailsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default SearchPage;
