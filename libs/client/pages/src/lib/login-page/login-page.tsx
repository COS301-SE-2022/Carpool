import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, login } from '@carpool/client/store';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import Icon from 'react-native-vector-icons/Feather';

import { Button, Input, PasswordInput } from '@carpool/client/components';

import { Text, SafeAreaView, View, StyleSheet, Image } from 'react-native';

type RootStackParamList = {
  Login: undefined;
  Onboard: undefined;
  SignUp: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginPage({ navigation }: Props) {
  const dispatch: AppDispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = () => {
    dispatch(login({ email, password }));
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
              source={require('./title.png')}
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
              onPress={() => navigation.push('SignUp')}
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
});

export default LoginPage;
