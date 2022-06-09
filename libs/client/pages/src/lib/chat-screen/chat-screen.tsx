import React from 'react';
import { View, Text } from 'react-native';
import { ChatScreenProps } from '../NavigationTypes/navigation-types';

export function ChatScreen({ navigation }: ChatScreenProps) {
  return (
    <View>
      <Text>Welcome to ChatScreen!</Text>
    </View>
  );
}

export default ChatScreen;
