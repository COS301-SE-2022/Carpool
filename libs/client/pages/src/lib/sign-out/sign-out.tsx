/* eslint-disable-next-line */
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button } from '@carpool/client/components';
import * as SecureStore from 'expo-secure-store';
import { SignOutProps } from '../NavigationTypes/navigation-types';

export function SignOut({ navigation }: SignOutProps) {
  const signOutHandler = () => {
    SecureStore.deleteItemAsync('user');
    SecureStore.deleteItemAsync('trips');
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView>
      <Button onPress={signOutHandler} title="Sign Out" />
    </SafeAreaView>
  );
}

export default SignOut;
