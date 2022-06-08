/* eslint-disable-next-line */
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Button } from '@carpool/client/components';
import Icon from 'react-native-vector-icons/Feather';
import { KeyboardAvoidingView } from 'native-base';
import { ConfirmEmailPageProps } from '../NavigationTypes/navigation-types';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore, verifyEmail } from '@carpool/client/store';
import { AppDispatch } from '@carpool/client/store';

export function ConfirmEmailPage({ navigation }: ConfirmEmailPageProps) {
  const dispatch: AppDispatch = useDispatch();

  const userState = useSelector((state: RootStore) => state.user);
  const { user, status } = userState;

  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [fourth, setFourth] = useState('');
  const [fifth, setFifth] = useState('');
  const [sixth, setSixth] = useState('');

  const submitHandler = () => {
    const code = `${first}${second}${third}${fourth}${fifth}${sixth}`;

    if (user) {
      dispatch(verifyEmail({ id: user.id, code }));

      if (status === 'success') {
        navigation.navigate('LoginPage');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexColumn}>
        <KeyboardAvoidingView
          behavior="position"
          style={{
            flex: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ display: 'flex', flex: 1 }}>
            <Icon
              name="arrow-left"
              size={30}
              style={{ color: '#808080' }}
              onPress={() => navigation.goBack()}
            />
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 30,
              }}
            >
              <Image
                source={require('../assets/title.png')}
                style={{ resizeMode: 'cover' }}
              />
            </View>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 30,
              flex: 2,
            }}
          >
            <Image
              source={require('../assets/confirm_email.png')}
              style={{ resizeMode: 'cover' }}
            />
          </View>
          <View style={{ display: 'flex', flex: 2, justifyContent: 'center' }}>
            <Text
              style={{ textAlign: 'left', fontSize: 24, fontWeight: '700' }}
            >
              Confirm email address
            </Text>
            <Text
              style={{
                textAlign: 'left',
                fontSize: 15,
                fontWeight: '400',
                color: '#808080',
                marginTop: 8,
                marginBottom: 18,
                lineHeight: 22,
              }}
            >
              A confirmation email has been sent to ustudentnumber@domain.co.za
              Please click on the link in the email to confirm your email
              address. Then come back here and login.
            </Text>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <TextInput
                value={first}
                placeholder=""
                onChangeText={setFirst}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#808080',
                  fontSize: 20,
                  borderRadius: 8,
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  textAlign: 'center',
                  marginHorizontal: 5,
                }}
                placeholderTextColor="#808080"
                autoCapitalize="none"
                maxLength={1}
                keyboardType="number-pad"
              />
              <TextInput
                value={second}
                placeholder=""
                onChangeText={setSecond}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#808080',
                  fontSize: 20,
                  borderRadius: 8,
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  textAlign: 'center',
                  marginHorizontal: 5,
                }}
                placeholderTextColor="#808080"
                autoCapitalize="none"
              />
              <TextInput
                value={third}
                placeholder=""
                onChangeText={setThird}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#808080',
                  fontSize: 20,
                  borderRadius: 8,
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                  textAlign: 'center',
                  marginHorizontal: 5,
                }}
                placeholderTextColor="#808080"
                autoCapitalize="none"
              />
              <TextInput
                value={fourth}
                placeholder=""
                onChangeText={setFourth}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#808080',
                  fontSize: 20,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  textAlign: 'center',
                  paddingVertical: 15,
                  marginHorizontal: 5,
                }}
                placeholderTextColor="#808080"
                autoCapitalize="none"
              />
              <TextInput
                value={fifth}
                placeholder=""
                onChangeText={setFifth}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#808080',
                  fontSize: 20,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  textAlign: 'center',
                  paddingVertical: 15,
                  marginHorizontal: 5,
                }}
                placeholderTextColor="#808080"
                autoCapitalize="none"
              />
              <TextInput
                value={sixth}
                placeholder=""
                onChangeText={setSixth}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#808080',
                  fontSize: 20,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  textAlign: 'center',
                  paddingVertical: 15,
                  marginHorizontal: 5,
                }}
                placeholderTextColor="#808080"
                autoCapitalize="none"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Button title="Confirm" onPress={submitHandler} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  flexColumn: {
    flexDirection: 'column',
    height: '100%',
    marginHorizontal: 40,
    justifyContent: 'space-between',
  },
  borderStyle: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
  },
  input: {
    height: 40,
    marginVertical: 8,
    padding: 8,
    paddingLeft: 5,
    borderBottomColor: '#808080',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    flex: 10,
  },
  passwordInput: {
    height: 40,
    paddingLeft: 5,
    flex: 10,
  },
  button: {
    backgroundColor: '#188aed',
    width: '100%',
  },
});

export default ConfirmEmailPage;
