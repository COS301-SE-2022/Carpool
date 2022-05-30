/* eslint-disable-next-line */
import React from 'react';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { Button } from '@carpool/client/components';
import { SignOutProps } from '../NavigationTypes/navigation-types';
import { AppDispatch, logout } from '@carpool/client/store';

export function SignOut({ navigation }: SignOutProps) {
  const dispatch: AppDispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView>
      <Button onPress={signOutHandler} title="Sign Out" />
    </SafeAreaView>
  );
}

export default SignOut;
