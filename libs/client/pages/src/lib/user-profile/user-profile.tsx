import React, { useEffect } from 'react';
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
import { fetchUserProfile, AppDispatch, logout } from '@carpool/client/store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Entypo';

export function UserProfile({ navigation }: UserProfileProps) {
  const dispatch: AppDispatch = useDispatch();

  const userProfile = useSelector((state: RootStore) => state.userProfile);
  const { userProfile: profile, status } = userProfile;

  const user = useSelector((state: RootStore) => state.user);
  const { user: userData } = user;

  useEffect(() => {
    if (userData && !profile) {
      dispatch(fetchUserProfile(userData.id));
    }
  }, [dispatch, userData, profile]);

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
          // navigation.navigate('OnboardPage');
        },
      },
    ]);
  };

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
              <Image
                source={require('./lighter_grey.png')}
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
            <View style={{ flex: 5, display: 'flex', flexDirection: 'column' }}>
              {/* <Text>Logged In {profile.id}</Text> */}
              <View
                style={{
                  backgroundColor: '#d5d5d5',
                  width: '100%',
                  height: 0.5,
                }}
              ></View>
              <Pressable
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  padding: 10,
                  paddingHorizontal: 15,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={() => navigation.push('EditProfile')}
              >
                <View
                  style={{
                    backgroundColor: '#f5f5f5',
                    padding: 3,
                    borderRadius: 5,
                    flex: 1,
                  }}
                >
                  <Icon
                    name="account"
                    size={20}
                    style={{
                      color: '#188aed',
                    }}
                  />
                </View>
                <View style={{ flex: 12, paddingLeft: 15 }}>
                  <Text style={{ fontWeight: '500', fontSize: 15 }}>
                    Profile
                  </Text>
                </View>
                <View
                  style={{
                    padding: 3,
                    borderRadius: 20,
                    flex: 1,
                  }}
                >
                  <Icon
                    name="chevron-right"
                    size={25}
                    style={{
                      color: '#000',
                    }}
                  />
                </View>
              </Pressable>
              <Pressable
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  padding: 10,
                  paddingHorizontal: 15,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={() => navigation.push('Statistics')}
              >
                <View
                  style={{
                    backgroundColor: '#f5f5f5',
                    padding: 3,
                    borderRadius: 5,
                    flex: 1,
                  }}
                >
                  <Icons
                    name="bar-graph"
                    size={20}
                    style={{
                      color: '#188aed',
                    }}
                  />
                </View>
                <View style={{ flex: 12, paddingLeft: 15 }}>
                  <Text style={{ fontWeight: '500', fontSize: 15 }}>
                    Statistics
                  </Text>
                </View>
                <View
                  style={{
                    padding: 3,
                    borderRadius: 20,
                    flex: 1,
                  }}
                >
                  <Icon
                    name="chevron-right"
                    size={25}
                    style={{
                      color: '#000',
                    }}
                  />
                </View>
              </Pressable>
              <Pressable
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  padding: 10,
                  paddingHorizontal: 15,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={() => navigation.push('TripHistory')}
              >
                <View
                  style={{
                    backgroundColor: '#f5f5f5',
                    padding: 3,
                    borderRadius: 5,
                    flex: 1,
                  }}
                >
                  <Icon
                    name="history"
                    size={22}
                    style={{
                      color: '#188aed',
                    }}
                  />
                </View>
                <View style={{ flex: 12, paddingLeft: 15 }}>
                  <Text style={{ fontWeight: '500', fontSize: 15 }}>
                    Trip History
                  </Text>
                </View>
                <View
                  style={{
                    // backgroundColor: '#f5f5f5',
                    padding: 3,
                    borderRadius: 20,
                    flex: 1,
                  }}
                >
                  <Icon
                    name="chevron-right"
                    size={25}
                    style={{
                      color: '#000',
                    }}
                  />
                </View>
              </Pressable>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  padding: 10,
                  paddingHorizontal: 15,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    backgroundColor: '#f5f5f5',
                    padding: 3,
                    borderRadius: 5,
                    flex: 1,
                  }}
                >
                  <Icon
                    name="lock"
                    size={20}
                    style={{
                      color: '#188aed',
                    }}
                  />
                </View>
                <View style={{ flex: 12, paddingLeft: 15 }}>
                  <Text style={{ fontWeight: '500', fontSize: 15 }}>
                    Change Password
                  </Text>
                </View>
                <View
                  style={{
                    // backgroundColor: '#f5f5f5',
                    padding: 3,
                    borderRadius: 20,
                    flex: 1,
                  }}
                >
                  <Icon
                    name="chevron-right"
                    size={25}
                    style={{
                      color: '#000',
                    }}
                  />
                </View>
              </View>
              <Pressable
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  padding: 10,
                  paddingHorizontal: 15,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={signOut}
              >
                <View
                  style={{
                    backgroundColor: '#f5f5f5',
                    padding: 3,
                    borderRadius: 5,
                    flex: 1,
                  }}
                >
                  <Icon
                    name="logout"
                    size={22}
                    style={{
                      color: '#188aed',
                    }}
                  />
                </View>
                <View style={{ flex: 12, paddingLeft: 15 }}>
                  <Text style={{ fontWeight: '500', fontSize: 15 }}>
                    Sign out
                  </Text>
                </View>
                <View
                  style={{
                    // backgroundColor: '#f5f5f5',
                    padding: 3,
                    borderRadius: 20,
                    flex: 1,
                  }}
                >
                  <Icon
                    name="chevron-right"
                    size={25}
                    style={{
                      color: '#000',
                    }}
                  />
                </View>
              </Pressable>
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
