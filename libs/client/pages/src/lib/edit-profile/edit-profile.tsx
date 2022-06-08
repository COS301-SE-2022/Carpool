import React, { useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import { UserProfileStackProps } from '../NavigationTypes/navigation-types';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '@carpool/client/store';
import { fetchUserProfile, AppDispatch } from '@carpool/client/store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Entypo';

export function EditProfile({ navigation }: UserProfileStackProps) {
  const dispatch: AppDispatch = useDispatch();

  const userProfile = useSelector((state: RootStore) => state.userProfile);
  const { userProfile: profile, status } = userProfile;

  const user = useSelector((state: RootStore) => state.user);
  const { user: userData } = user;

  useEffect(() => {
    if (userData) {
      dispatch(fetchUserProfile(userData.id));
    }
  }, [dispatch, userData]);

  return (
    <SafeAreaView style={{ height: '100%' }}>
      {status === 'loading' ? (
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
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 0.5,
                marginBottom: 10,
              }}
            >
              <Icon
                name="chevron-left"
                size={25}
                style={{
                  color: '#000',
                  flex: 1,
                }}
                onPress={() => navigation.goBack()}
              />
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 15,
                  flex: 10,
                  textAlign: 'center',
                }}
              >
                Profile
              </Text>
              <View style={{ flex: 1 }}></View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 3,
              }}
            >
              <Image
                source={require('../assets/lighter_grey.png')}
                resizeMode="contain"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  borderWidth: 3,
                  borderColor: '#188aed',
                  marginBottom: 15,
                }}
              />
              <Text
                style={{ fontSize: 20, fontWeight: '600', marginBottom: 20 }}
              >
                {profile.name} {profile.surname}
              </Text>
              {/* <Pressable
            style={{
              width: '50%',
              backgroundColor: '#188aed',
              borderRadius: 30,
              paddingVertical: 8,
            }}
            onPress={editProfile}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              Edit Profile
            </Text>
          </Pressable> */}
            </View>
            <View
              style={{ flex: 5, display: 'flex', flexDirection: 'column' }}
            ></View>
          </View>
        )
      )}
    </SafeAreaView>
  );
}

export default EditProfile;
