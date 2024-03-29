import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import { UserProfileProps } from '../NavigationTypes/navigation-types';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '@carpool/client/store';
import {
  fetchUserProfile,
  AppDispatch,
  logout,
  listTripRequests,
  uploadImage,
} from '@carpool/client/store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Entypo';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'react-native-image-picker';
import { UserProfileItem } from '@carpool/client/components';

export function UserProfile({ navigation }: UserProfileProps) {
  const dispatch: AppDispatch = useDispatch();

  const userProfile = useSelector((state: RootStore) => state.userProfile);
  const { userProfile: profile, status } = userProfile;

  const uploadImageState = useSelector((state: RootStore) => state.imageUpload);
  const { status: uploadStatus, image: uploadedImage } = uploadImageState;

  const requestsState = useSelector((state: RootStore) => state.tripRequests);
  const { requests, status: requestsStatus } = requestsState;

  const user = useSelector((state: RootStore) => state.user);
  const { user: userData } = user;

  useEffect(() => {
    if (userData) {
      dispatch(fetchUserProfile(userData.id));
    }
  }, [dispatch, userData, uploadedImage]);

  const signOut = () => {
    Alert.alert('Are you sure?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          dispatch(logout());
        },
      },
    ]);
  };

  const resetPassword = () => {
    if (userData) {
      navigation.push('NewPasswordPage', {
        email: userData.email,
        previousScreen: 'UserProfile',
      });
    }
  };

  const pickImage = async () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        if (
          response &&
          response.assets &&
          response.assets[0].uri &&
          response.assets[0].type &&
          response.assets[0].fileName
        ) {
          console.log(response.assets[0]);

          const formData = new FormData();
          formData.append('upload', {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          } as unknown as Blob);

          userData &&
            dispatch(
              uploadImage({
                image: formData,
                id: userData.id,
              })
            );
        }
      }
    );
  };

  return (
    <SafeAreaView style={{ height: '100%' }}>
      {status === 'loading' ||
      requestsStatus === 'loading' ||
      uploadStatus === 'loading' ? (
        <ActivityIndicator />
      ) : (
        profile && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 10,
              paddingBottom: 20,
              display: 'flex',
              height: '100%',
              flexDirection: 'column',
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 15,
                }}
              >
                Profile
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 3,
              }}
            >
              <View
                style={{
                  borderRadius: 50,
                  marginBottom: 15,
                }}
              >
                <Image
                  source={{ uri: profile.profilePic }}
                  resizeMode="cover"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    borderWidth: 3,
                    borderColor: '#188aed',
                  }}
                />
                <Pressable
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    padding: 5,
                    borderRadius: 50,
                    backgroundColor: '#fff',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                  onPress={pickImage}
                >
                  <Icon name="pencil-outline" size={20} />
                </Pressable>
              </View>
              <Text
                style={{ fontSize: 20, fontWeight: '600', marginBottom: 20 }}
              >
                {profile.name} {profile.surname}
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                }}
              >
                <View style={{ display: 'flex', alignItems: 'center' }}>
                  <Icon
                    name="car"
                    size={30}
                    style={{
                      color: '#188aed',
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#188aed',
                        fontSize: 15,
                        fontWeight: '700',
                      }}
                    >
                      100
                    </Text>
                  </View>
                </View>
                <Icon
                  name="account"
                  size={20}
                  style={{
                    color: '#188aed',
                  }}
                />
              </View>
            </View>
            <View style={{ flex: 5, display: 'flex', flexDirection: 'column' }}>
              <View
                style={{
                  backgroundColor: '#d5d5d5',
                  width: '100%',
                  height: 0.5,
                }}
              ></View>
              <UserProfileItem
                title="Profile"
                onPress={() => navigation.push('EditProfile')}
                icon={
                  <Icon
                    name="account"
                    size={20}
                    style={{
                      color: '#188aed',
                    }}
                  />
                }
              />
              <UserProfileItem
                title="Requests"
                onPress={() => navigation.push('Statistics')}
                count="0"
                icon={
                  <Icons
                    name="heart"
                    size={20}
                    style={{
                      color: '#188aed',
                    }}
                  />
                }
              />
              <UserProfileItem
                title="Payments"
                onPress={() => navigation.push('CheckoutTrips')}
                count="0"
                icon={
                  <IconMaterial
                    name="payments"
                    size={20}
                    style={{
                      color: '#188aed',
                    }}
                  />
                }
              />
              <UserProfileItem
                title="Trip History"
                onPress={() => navigation.push('TripHistory')}
                icon={
                  <Icon
                    name="history"
                    size={22}
                    style={{
                      color: '#188aed',
                    }}
                  />
                }
              />
              <UserProfileItem
                title="Review"
                onPress={() => navigation.push('TripRatingPage')}
                icon={
                  <Icon
                    name="star"
                    size={22}
                    style={{
                      color: '#188aed',
                    }}
                  />
                }
              />
              <UserProfileItem
                title="Change Password"
                onPress={resetPassword}
                icon={
                  <Icon
                    name="lock"
                    size={20}
                    style={{
                      color: '#188aed',
                    }}
                  />
                }
              />
              <UserProfileItem
                title="Sign out"
                onPress={signOut}
                icon={
                  <Icon
                    name="logout"
                    size={22}
                    style={{
                      color: '#188aed',
                    }}
                  />
                }
              />
              <View
                style={{
                  backgroundColor: '#d5d5d5',
                  width: '100%',
                  height: 0.5,
                }}
              ></View>
            </View>
          </View>
        )
      )}
    </SafeAreaView>
  );
}

export default UserProfile;
