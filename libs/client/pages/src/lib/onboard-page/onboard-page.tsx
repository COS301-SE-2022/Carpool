import React from 'react';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { Button } from '@carpool/client/components';
import { Text, SafeAreaView, View, StyleSheet, Image } from 'react-native';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Onboard: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Onboard'>;

export function OnboardPage({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexColumn}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 26,
            flex: 1,
          }}
        >
          <Image
            source={require('./title.png')}
            style={{ resizeMode: 'cover' }}
          />
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
            source={require('./onboard.png')}
            style={{ resizeMode: 'cover' }}
          />
        </View>
        <View style={{ display: 'flex', flex: 2, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'left', fontSize: 24, fontWeight: '700' }}>
            Welcome to Carpool,
          </Text>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 15,
              fontWeight: '400',
              color: '#808080',
              marginTop: 8,
              marginBottom: 18,
              lineHeight: 20,
            }}
          >
            Book &amp; share rides with fellow students. Save money, time &amp;
            meet new people. Click below to login or sign up!
          </Text>
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
          <View style={{ marginVertical: 20 }}>
            <Button
              title="Login"
              onPress={() => navigation.navigate('Login')}
            />
          </View>
          <Button
            title="Sign Up"
            onPress={() => navigation.navigate('Login')}
          />
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

export default OnboardPage;
