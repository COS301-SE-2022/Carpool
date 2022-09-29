/* eslint-disable-next-line */
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Button, Input } from '@carpool/client/components';
import Icon from 'react-native-vector-icons/Feather';
import { ForgotPasswordPageProps } from '../NavigationTypes/navigation-types';
import { RootStore, AppDispatch, forgotPassword } from '@carpool/client/store';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

export function ForgotPasswordPage({ navigation }: ForgotPasswordPageProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');

  const forgotPasswordState = useSelector(
    (state: RootStore) => state.forgotPassword
  );
  const { status, user, error } = forgotPasswordState;

  const showToast = (message: string) => {
    Toast.show({
      type: 'error',
      position: 'top',
      text1: message,
    });
  };

  useEffect(() => {
    if (user) {
      navigation.navigate('ForgotPasswordCodePage', { email });
    }
  }, [user, navigation, email]);

  useEffect(() => {
    if (error) {
      showToast(error.message);
    }
  }, [error]);

  const handleSubmit = (email: string) => {
    if (email !== '') {
      dispatch(forgotPassword(email));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexColumn}>
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
            source={require('../assets/forgot_password.png')}
            style={{ resizeMode: 'cover' }}
          />
        </View>
        <View style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'left', fontSize: 24, fontWeight: '700' }}>
            Forgot password?
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
            No problem. It happens to all of us! Enter your registered email
            address below to receive a password reset email.
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          {status === 'loading' ? (
            <ActivityIndicator size="large" />
          ) : (
            <>
              <View>
                <Input
                  inputPlaceholder="Email Address"
                  iconName="email"
                  onChangeText={setEmail}
                  inputValue={email}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  marginBottom: 10,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Button
                  title="Reset Password"
                  onPress={() => handleSubmit(email)}
                />
              </View>
            </>
          )}
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

export default ForgotPasswordPage;
