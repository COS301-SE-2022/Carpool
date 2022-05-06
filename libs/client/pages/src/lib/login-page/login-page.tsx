import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, login, RootStore } from '@carpool/client/store';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import Icon from 'react-native-vector-icons/Feather';

import { Button } from '@carpool/client/components';

import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Onboard: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginPage({ navigation }: Props) {
  const dispatch: AppDispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const userState = useSelector((state: RootStore) => state.user);
  const { user } = userState;

  useEffect(() => {
    if (user && user.name) {
      navigation.navigate('Home');
    }
  }, [user, navigation]);

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
            onPress={() => navigation.navigate('Onboard')}
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
          {/* <Title /> */}
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
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Icon
              name="mail"
              size={22}
              style={{ flex: 1, color: '#808080', marginRight: 8 }}
            />
            <TextInput
              value={email}
              placeholder="Email Address"
              onChangeText={setEmail}
              style={styles.input}
              placeholderTextColor="#808080"
              autoCapitalize="none"
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Icon
              name="lock"
              size={22}
              style={{
                flex: 1,
                color: '#808080',
                marginRight: 8,
              }}
            />
            <View
              style={{
                flex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: '#808080',
                  borderBottomWidth: 1,
                  marginVertical: 8,
                }}
              >
                <TextInput
                  value={password}
                  placeholder="Password"
                  onChangeText={setPassword}
                  style={styles.passwordInput}
                  secureTextEntry={show ? false : true}
                  placeholderTextColor="#808080"
                  autoCapitalize="none"
                />
                <Icon
                  name="eye-off"
                  size={20}
                  style={{ color: '#808080', marginRight: 5 }}
                  onPress={() => setShow(!show)}
                />
              </View>
              <Text
                style={{ color: '#188aed', alignSelf: 'flex-end' }}
                onPress={() => navigation.navigate('Home')}
              >
                Forgot password?
              </Text>
            </View>
          </View>
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
            <Text
              style={{ color: '#808080' }}
              onPress={() => navigation.navigate('Home')}
            >
              Don't have an account?
            </Text>
            <Text
              style={{ color: '#188aed' }}
              onPress={() => navigation.navigate('Home')}
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
