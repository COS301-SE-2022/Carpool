import React, { useState, useEffect } from 'react';
import { RegisterDriverProps } from '../NavigationTypes/navigation-types';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  // Image,
  ActivityIndicator,
} from 'react-native';
import { AppDispatch, RootStore, registerDriver } from '@carpool/client/store';
import { Button, Input } from '@carpool/client/components';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';

export function RegisterDriver({ route, navigation }: RegisterDriverProps) {
  // const { userId } = route.params;

  const dispatch: AppDispatch = useDispatch();

  const userState = useSelector((state: RootStore) => state.user);
  const { status, user } = userState;

  const driverState = useSelector((state: RootStore) => state.driver);
  const { status: driverStatus } = driverState;

  const [ID, setID] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicle, setVehicle] = useState('');
  // const [image, setImage] = useState('');

  useEffect(() => {
    if (driverStatus === 'success') {
      navigation.navigate('PostTrips');
    }
  }, [driverStatus, navigation]);

  const submitHandler = () => {
    dispatch(
      registerDriver({
        userId: user ? user.id : '',
        ID: ID,
        licensePlate: licensePlate,
        carModel: vehicle,
      })
    );
  };

  const pickImage = () => {
    console.log('pick image');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flexColumn}>
        <View style={{ display: 'flex', flex: 1, marginTop: 10 }}>
          <Icon
            name="arrow-left"
            size={30}
            style={{ color: '#808080' }}
            onPress={() => navigation.goBack()}
          />
          {/* <View
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
          </View> */}
        </View>
        <View style={{ display: 'flex', flex: 8 }}>
          <Text style={{ textAlign: 'left', fontSize: 24, fontWeight: '700' }}>
            Driver Registration
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
            Enter your details to register as a driver
          </Text>
          {status === 'loading' ? (
            <ActivityIndicator size="large" />
          ) : (
            <>
              <Input
                onChangeText={setID}
                inputValue={ID}
                inputPlaceholder="ID Number"
                iconName="account"
              />
              <Input
                onChangeText={setLicensePlate}
                inputValue={licensePlate}
                inputPlaceholder="License Plate Number"
                iconName="school"
              />
              <Input
                onChangeText={setVehicle}
                inputValue={vehicle}
                inputPlaceholder="Vehicle Model"
                iconName="directions-car"
                iconType="Material"
              />
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
          <Button title="Select Photo" marginBottom={8} onPress={pickImage} />
          <Button title="Submit" marginBottom={8} onPress={submitHandler} />
          <Button title="Cancel" colour="#FF412B" onPress={submitHandler} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  button: {
    backgroundColor: '#188aed',
    width: '100%',
  },
});

export default RegisterDriver;
