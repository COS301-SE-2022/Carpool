import React from 'react';

import { View, Text } from 'react-native';
import { PostTripsProps } from '../NavigationTypes/navigation-types';

/* eslint-disable-next-line */

export function PostTrips({ navigation }: PostTripsProps) {
  return (
    <View>
      <Text>Welcome to post-trips!</Text>
    </View>
  );
}

export default PostTrips;
