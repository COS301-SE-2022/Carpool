/* eslint-disable-next-line */
import React from 'react';
import { TripDetailsProps } from '../NavigationTypes/navigation-types';
import { View } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native';

export function TripDetails({ route, navigation }: TripDetailsProps) {
  const { tripId } = route.params;

  return (
    <SafeAreaView>
      <Text>{tripId}</Text>
    </SafeAreaView>
  );
}

export default TripDetails;
