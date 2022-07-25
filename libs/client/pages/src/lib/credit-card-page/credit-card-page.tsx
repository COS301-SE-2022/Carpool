import React from 'react';
import { View, Text } from 'react-native';
import { CreditCardProps } from '../NavigationTypes/navigation-types';
import { FormProvider, useForm } from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import CreditCardForm, { Button, FormModel } from 'rn-credit-card';



export function CreditCard({ navigation }: CreditCardProps) {
  const formMethods = useForm<FormModel>({
    mode: 'onBlur',
    defaultValues: {
      holderName: '',
      cardNumber: '',
      expiration: '',
      cvv: '',
    },
  });
  const { handleSubmit, formState } = formMethods;

  const onSubmit = (model: FormModel) => {
    Alert.alert('Success: ' + JSON.stringify(model, null, 2));

  };

  return (
    <FormProvider {...formMethods}>
          <Icon
    name="chevron-left"
    size={25}
    style={{
      color: '#000',
      flex: 1,
    }}
    onPress={() => navigation.goBack()}
  />
        <SafeAreaView style={{flex: 1}}>
          <KeyboardAvoidingView
            style={{flex: 1, padding: 36,}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <CreditCardForm
              LottieView={LottieView}
              horizontalStart
              overrides={{
                labelText: {
                  marginTop: 16,
                },
              }}
            />
          </KeyboardAvoidingView>
          {formState.isValid && (
            <Button
              style={{backgroundColor: '#188aed', margin: 36, marginTop: 0 ,borderRadius: 25,}}
              title={'CONFIRM PAYMENT'}
              onPress={handleSubmit(onSubmit)}
            />
          )}
        </SafeAreaView>
      </FormProvider>

  // };
  );
}

export default CreditCard;
