import React from 'react';
import { View, Text } from 'react-native';
import { PayfastPageProps } from '../NavigationTypes/navigation-types';
import {PayFastWebView} from "react-native-payfast";
import {WebView} from "react-native-webview";

export function PayfastPage({ navigation }: PayfastPageProps) {
  const paymentData = {
    merchant_id : 10000100,
    merchant_key: '46f0cd694581a',
    amount: 60.00,
    item_name: 'React Native Purchase'
};
  return (
      <WebView
        source={{ uri: 'https://infinite.red' }}
        style={{ marginTop: 20 }}
      />
  );
}

export default PayfastPage;