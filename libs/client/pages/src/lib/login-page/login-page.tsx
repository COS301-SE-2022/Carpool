import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, login, RootStore } from '@carpool/client/store';
import Icon from 'react-native-vector-icons/Feather';
import { Button, Input, PasswordInput } from '@carpool/client/components';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { LoginPageProps } from '../NavigationTypes/navigation-types';
import Toast from 'react-native-toast-message';

export function LoginPage({ navigation }: LoginPageProps) {
  const dispatch: AppDispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userState = useSelector((state: RootStore) => state.user);
  const { status, error } = userState;

  const showToast = (message: string) => {
    Toast.show({
      type: 'error',
      position: 'top',
      text1: message,
    });
  };

  useEffect(() => {
    if (error) {
      showToast(error.message);
    }
  }, [error]);

  const submitHandler = () => {
    // navigation.navigate('Home');
    // if (user && !user.token && status !== 'success') {
    //   navigation.navigate('Home');
    // } else {
    dispatch(login({ email, password }));
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexColumn}>
        <View style={{ display: 'flex', flex: 3 }}>
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
        <View style={{ display: 'flex', flex: 5 }}>
          <Text style={{ textAlign: 'left', fontSize: 24, fontWeight: '700' }}>
            Login
          </Text>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 15,
              fontWeight: '400',
              color: '#808080',
              marginTop: 8,
              marginBottom: 18,
            }}
          >
            Login to book or offer a ride.
          </Text>
          {status === 'loading' ? (
            <ActivityIndicator size="large" />
          ) : (
            <>
              <Input
                inputPlaceholder="Email Address"
                onChangeText={setEmail}
                iconName="email"
                inputValue={email}
              />
              <PasswordInput
                inputPlaceholder="Password"
                onChangeText={setPassword}
                iconOneName="lock"
                iconTwoName="eye-off"
                inputValue={password}
              />
              <Text
                style={{ color: '#188aed', textAlign: 'right' }}
                onPress={() => navigation.push('ForgotPasswordPage')}
              >
                Forgot Password?
              </Text>
            </>
          )}
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: 'flex-end',
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <Text style={{ color: '#808080' }}>Don't have an account?</Text>
            <Text
              style={{ color: '#188aed' }}
              onPress={() => navigation.push('SignUpPage')}
            >
              &nbsp;Sign up
            </Text>
          </View>
          <Button title="Login" onPress={submitHandler} />
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
  containerNew: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default LoginPage;
