import React, { useState, useEffect, Fragment } from 'react';
import { RegisterDriverProps } from '../NavigationTypes/navigation-types';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {
  AppDispatch,
  RootStore,
  registerDriver,
  uploadDriversLicense,
} from '@carpool/client/store';
import { Button, Input } from '@carpool/client/components';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';
import callGoogleVisionAsync from './helperFunctions';

export function RegisterDriver({ route, navigation }: RegisterDriverProps) {
  const dispatch: AppDispatch = useDispatch();

  const userState = useSelector((state: RootStore) => state.user);
  const { status, user } = userState;

  const driverState = useSelector((state: RootStore) => state.driver);
  const { status: driverStatus } = driverState;

  const driverUploadState = useSelector(
    (state: RootStore) => state.driverUpload
  );
  const { status: driverUploadStatus, image: driverImage } = driverUploadState;

  const [ID, setID] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicle, setVehicle] = useState('');
  // const [image, setImage] = useState('');

  useEffect(() => {
    if (driverStatus === 'success') {
      navigation.navigate('PostTrips');
    }
  }, [driverStatus, navigation]);

  // useEffect(() => {
  //   if (driverImage) {
  //     setImage(driverImage);
  //   }
  // }, [driverImage]);

  const submitHandler = () => {
    dispatch(
      registerDriver({
        userId: user ? user.id : '',
        ID: ID,
        licensePlate: licensePlate,
        carModel: vehicle,
        license: '',
      })
    );
  };

  const pickImage = async () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 200,
        maxWidth: 200,
      },
      async (response) => {
        if (
          response &&
          response.assets &&
          response.assets[0].uri &&
          response.assets[0].type &&
          response.assets[0].fileName &&
          response.assets[0].base64
        ) {
          console.log(response.assets[0]);

          const formData = new FormData();
          formData.append('upload', {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          } as unknown as Blob);

          const idNo = await callGoogleVisionAsync(response.assets[0].base64);

          setID(idNo);

          // setImage(response.assets[0].uri);

          user &&
            dispatch(
              uploadDriversLicense({
                image: formData,
                id: user.id,
              })
            );
        }
      }
    );
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
              <View
                style={{
                  borderWidth: driverImage !== '' ? 0 : 1,
                  borderStyle: 'dashed',
                  borderRadius: 15,
                  height: '20%',
                  marginTop: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Pressable
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}
                  onPress={pickImage}
                >
                  {driverImage ? (
                    <Image
                      source={{ uri: driverImage }}
                      resizeMode="contain"
                      style={{
                        width: 250,
                        height: 120,
                      }}
                    />
                  ) : (
                    <Fragment>
                      <Icon
                        name="camera"
                        size={20}
                        style={{ color: '#808080', marginRight: 5 }}
                        onPress={() => navigation.goBack()}
                      />
                      <Text>Upload Drivers License</Text>
                    </Fragment>
                  )}
                </Pressable>
              </View>
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
          {/* <Button title="Select Photo" marginBottom={8} onPress={pickImage} /> */}
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
