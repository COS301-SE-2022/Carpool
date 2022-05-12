import { Center } from 'native-base';
import React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DriverHomeProps } from '../NavigationTypes/navigation-types';

/* eslint-disable-next-line */

export function DriverHome({ navigation }: DriverHomeProps) {
  return (
    <SafeAreaView >
      <View style={{
        left: 5 , margin: 10
      }}>
        <Icon
          name="arrow-left"
          size={30}
          style={{
          }}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View>
        <Center>
          <Text>Trip Details</Text>
        </Center>
      </View>
    </SafeAreaView>
  );
}
export default DriverHome;
