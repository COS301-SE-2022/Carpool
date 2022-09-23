import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Button, PasswordInput } from '@carpool/client/components';
import Icon from 'react-native-vector-icons/Feather';
import { NewPasswordPageProps } from '../NavigationTypes/navigation-types';
import { RootStore, AppDispatch, resetPassword } from '@carpool/client/store';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

export function NewPasswordPage({ navigation, route }: NewPasswordPageProps) {
  const dispatch = useDispatch<AppDispatch>();

  const { email, previousScreen } = route.params;

  console.log(previousScreen);

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const showToast = (message: string) => {
    Toast.show({
      type: 'error',
      position: 'top',
      text1: message,
    });
  };

  const resetPasswordState = useSelector(
    (state: RootStore) => state.resetPassword
  );
  const { status, user, error } = resetPasswordState;

  useEffect(() => {
    if (user) {
      navigation.navigate('LoginPage');
    }
  }, [user, navigation]);

  useEffect(() => {
    if (error) {
      showToast(error.message);
    }
  }, [error]);

  const handleSubmit = (email: string) => {
    if (password !== passwordConfirm) {
      showToast('Passwords do not match');
      return;
    }

    if (email === '' || password === '' || passwordConfirm === '') {
      showToast('Please fill out all fields');
      return;
    }

    if (email !== '' && password !== '' && passwordConfirm !== '') {
      dispatch(resetPassword({ email, password }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexColumn}>
        <View
          style={{
            display: 'flex',
            flex: previousScreen === 'UserProfile' ? 0.5 : 1,
          }}
        >
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
              marginTop: previousScreen === 'UserProfile' ? 0 : 30,
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
            flex: previousScreen === 'UserProfile' ? 1 : 2,
          }}
        >
          <Image
            source={require('../assets/forgot_password.png')}
            style={{ resizeMode: 'cover' }}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flex: previousScreen === 'UserProfile' ? 0.5 : 1,
            justifyContent: 'center',
          }}
        >
          <Text style={{ textAlign: 'left', fontSize: 24, fontWeight: '700' }}>
            Reset Password
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
            Enter your new password below.
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          {status === 'loading' ? (
            <ActivityIndicator size="large" />
          ) : (
            <>
              <View>
                <PasswordInput
                  inputPlaceholder="Password"
                  iconOneName="lock"
                  iconTwoName="eye-off"
                  onChangeText={setPassword}
                  inputValue={password}
                />
                <PasswordInput
                  inputPlaceholder="Confirm Password"
                  iconOneName="lock"
                  iconTwoName="eye-off"
                  onChangeText={setPasswordConfirm}
                  inputValue={passwordConfirm}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  marginBottom: previousScreen === 'UserProfile' ? 35 : 10,
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

export default NewPasswordPage;
