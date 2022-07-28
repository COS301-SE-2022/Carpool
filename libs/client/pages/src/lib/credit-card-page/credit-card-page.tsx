import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { CreditCardProps } from '../NavigationTypes/navigation-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppDispatch,
  RootStore,
  updateBookingPaymentStatus,
  findBookingId,
} from '@carpool/client/store';
import Toast from 'react-native-toast-message';

import { Button } from '@carpool/client/components';

export function CreditCard({ navigation, route }: CreditCardProps) {
  const { tripId } = route.params;

  const user = useSelector((state: RootStore) => state.user);
  const { user: userData } = user;

  const bookindIdState = useSelector((state: RootStore) => state.bookingId);
  const { bookingId, status, error } = bookindIdState;

  const paymentStatusState = useSelector(
    (state: RootStore) => state.updatePaymentStatus
  );
  const { status: paymentStatus, error: paymentStatusError } =
    paymentStatusState;

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      dispatch(findBookingId({ tripId, userId: userData.id }));
    }

    if (paymentStatus === 'success') {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
      });

      setTimeout(() => {
        navigation.navigate('HomePage');
      }, 2000);
    }
  }, [dispatch, userData, tripId, paymentStatus, navigation]);

  const [name, setName] = useState('Name Surname');
  const [number, setNumber] = useState('XXXX XXXX XXXX XXXX');
  const [expiry, setExpiry] = useState('MM/YY');
  const [cvc, setCvc] = useState('XXX');

  const [displayNum, setDisplayNum] = useState('XXXX XXXX XXXX XXXX');
  const [displayExp, setDisplayExp] = useState('MM/YY');

  const onCardNumberChange = (cardNumber: string) => {
    let newNumber = cardNumber;
    if (cardNumber.length < 16) {
      while (newNumber.length < 16) {
        newNumber += 'X';
      }
    }
    const joy = newNumber.match(/.{1,4}/g);
    const cardJoy = cardNumber.match(/.{1,4}/g);
    setDisplayNum(joy ? joy?.join(' ') : newNumber);
    setNumber(cardJoy ? cardJoy?.join('') : cardNumber);
  };

  const onExpiryChange = (expiry: string) => {
    const newNumber = expiry;
    const joy = newNumber.match(/.{1,2}/g);
    const cardJoy = expiry.match(/.{1,2}/g);
    setDisplayExp(joy ? joy?.join('/') : newNumber);
    setExpiry(cardJoy ? cardJoy?.join('') : expiry);
  };

  const submitPayment = () => {
    if (bookingId) {
      dispatch(updateBookingPaymentStatus(bookingId));
    }
    console.log('first');
  };

  return (
    <SafeAreaView
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
      }}
    >
      {status === 'loading' ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              paddingHorizontal: 30,
              paddingVertical: 20,
            }}
          >
            <Icon
              name="arrow-left"
              size={22}
              style={{ flex: 2, color: '#808080' }}
              onPress={() => navigation.goBack()}
            />
            <Text style={{ fontWeight: '700', fontSize: 20, flex: 6 }}>
              Search for trips
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ width: '100%' }}>
              {/* <Image
            source={require('./card-front.png')}
            style={{ width: 300, height: 180, borderRadius: 10 }}
          /> */}
              <ImageBackground
                source={require('./card-front.png')}
                resizeMode="cover"
                style={{ width: 300, height: 180 }}
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <View style={{ flex: 1 }}></View>
                  <View
                    style={{
                      flex: 1.5,
                      display: 'flex',
                      justifyContent: 'space-around',
                    }}
                  >
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: '600',
                        textAlign: 'center',
                        fontSize: 18,
                      }}
                    >
                      {displayNum === '' ? 'XXXX XXXX XXXX XXXX' : displayNum}
                    </Text>
                    <View
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        paddingHorizontal: 12,
                      }}
                    >
                      <View style={{ display: 'flex' }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontWeight: '400',
                            marginBottom: 3,
                            fontSize: 12,
                          }}
                        >
                          CARDHOLDER NAME
                        </Text>
                        <Text style={{ color: '#fff', fontWeight: '600' }}>
                          {name === '' ? 'Name Surname' : name}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            color: '#fff',
                            fontWeight: '400',
                            marginBottom: 3,
                            fontSize: 12,
                          }}
                        >
                          EXPIRATION
                        </Text>
                        <Text style={{ color: '#fff', fontWeight: '600' }}>
                          {displayExp === '' ? 'MM/YY' : displayExp}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              width: '100%',
              paddingHorizontal: 20,
            }}
          >
            <TextInput
              value={number === 'XXXX XXXX XXXX XXXX' ? '' : number}
              placeholder={'Card Number'}
              onChangeText={(value) => onCardNumberChange(value)}
              style={styles.input}
              placeholderTextColor="#808080"
              autoCapitalize="none"
              maxLength={16}
              keyboardType="numeric"
            />
            <TextInput
              value={name === 'Name Surname' ? '' : name}
              placeholder={'Card Holder Name'}
              onChangeText={setName}
              style={styles.input}
              placeholderTextColor="#808080"
              autoCapitalize="none"
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <TextInput
                value={expiry}
                placeholder={'MM/YY'}
                onChangeText={(value) => onExpiryChange(value)}
                style={[styles.input, { flex: 1, marginRight: 8 }]}
                placeholderTextColor="#808080"
                autoCapitalize="none"
              />
              <TextInput
                value={cvc === 'XXX' ? '' : cvc}
                placeholder={'CVC'}
                onChangeText={setCvc}
                style={[styles.input, { flex: 1, marginLeft: 8 }]}
                placeholderTextColor="#808080"
                autoCapitalize="none"
              />
            </View>
            <View>
              <Button title="Pay Now" onPress={submitPayment} />
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
    // <FormProvider {...formMethods}>
    //   <Icon
    //     name="chevron-left"
    //     size={25}
    //     style={{ color: '#000' }}
    //     onPress={() => navigation.goBack()}
    //   />
    //   <SafeAreaView style={{ flex: 1 }}>
    //     <KeyboardAvoidingView
    //       style={{ flex: 1, padding: 36 }}
    //       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //     >
    //       <CreditCardForm
    //         LottieView={LottieView}
    //         horizontalStart
    //         overrides={{
    //           labelText: {
    //             marginTop: 16,
    //           },
    //         }}
    //       />
    //     </KeyboardAvoidingView>
    //     {formState.isValid && (
    //       <Button
    //         style={{
    //           backgroundColor: '#188aed',
    //           margin: 36,
    //           marginTop: 0,
    //           borderRadius: 25,
    //         }}
    //         title={'CONFIRM PAYMENT'}
    //         onPress={handleSubmit(onSubmit)}
    //       />
    //     )}
    //   </SafeAreaView>
    // </FormProvider>

    // };
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginVertical: 12,
    padding: 8,
    paddingLeft: 10,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'solid',
  },
});

export default CreditCard;
