import React from 'react';
import { View, Text } from 'react-native';
import { PayfastPageProps } from '../NavigationTypes/navigation-types';
import {PayFastWebView} from "react-native-payfast";
import {WebView} from "react-native-webview";
import {PayfastView} from "@carpool/client/components";

export function PayfastPage({ navigation }: PayfastPageProps) {
 // const { tripId } = route.params;
  const paymentData = {
    merchant_id : 10000100,
    merchant_key: '46f0cd694581a',
    amount: 30.00,
    item_name: 'React Native Purchase'
};
  return (
      <PayfastView title ="Pay Now" data = {paymentData} sandbox={true} signature = {false} passphrase = {""}/>
  );
}

export default PayfastPage;
