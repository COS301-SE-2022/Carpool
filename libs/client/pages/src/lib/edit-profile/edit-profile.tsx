import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Image,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import { UserProfileProps } from '../NavigationTypes/navigation-types';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '@carpool/client/store';
import {
  fetchUserProfile,
  AppDispatch,
  createUpdateUser,
} from '@carpool/client/store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function EditProfile({ navigation }: UserProfileProps) {
  const dispatch: AppDispatch = useDispatch();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [cellNumber, setCellNumber] = useState('');

  const userProfile = useSelector((state: RootStore) => state.userProfile);
  const { userProfile: profile, status } = userProfile;

  const user = useSelector((state: RootStore) => state.user);
  const { user: userData } = user;

  const updateUser = useSelector((state: RootStore) => state.updateUser);
  const { status: updateStatus } = updateUser;

  useEffect(() => {
    if (userData && !profile) {
      dispatch(fetchUserProfile(userData.id));
    }

    if (profile) {
      setName(profile.name);
      setSurname(profile.surname);
      setEmail(profile.email);
      setUniversity(profile.university);
      setStudentNumber(profile.studentNumber);
      setCellNumber(profile.cellNumber);
    }
  }, [dispatch, userData, updateStatus, profile]);

  const saveProfile = () => {
    dispatch(
      createUpdateUser({
        id: userData ? userData.id : '',
        name,
        surname,
        email,
        university,
        studentNumber,
        cellNumber,
      })
    );
    if (userData && updateStatus === 'success') {
      dispatch(fetchUserProfile(userData.id));
    }
  };

  return (
    <SafeAreaView style={{ height: '100%' }}>
      {status === 'loading' ? (
        <View
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator />
        </View>
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
                Edit Profile
              </Text>
              <View style={{ flex: 1 }}></View>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 2,
              }}
            >
              <Image
                source={{ uri: profile.profilePic }}
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
            </View>
            <View style={{ flex: 5 }}>
              <ScrollView
                style={
                  {
                    // flex: 1,
                    // display: 'flex',
                    // flexDirection: 'column',
                    // alignItems: 'center',
                  }
                }
              >
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '100%',
                    marginVertical: 5,
                  }}
                >
                  <Text style={{ paddingLeft: 5 }}>Name</Text>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    style={{
                      height: 40,
                      marginVertical: 8,
                      padding: 8,
                      paddingLeft: 10,
                      borderColor: '#808080',
                      borderWidth: 0.5,
                      borderStyle: 'solid',
                      borderRadius: 5,
                      backgroundColor: '#f5f5f5',
                      width: '100%',
                    }}
                    placeholderTextColor="#808080"
                    autoCapitalize="none"
                  />
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '100%',
                    marginVertical: 5,
                  }}
                >
                  <Text style={{ paddingLeft: 5 }}>Surname</Text>
                  <TextInput
                    value={surname}
                    onChangeText={setSurname}
                    style={{
                      height: 40,
                      marginVertical: 8,
                      padding: 8,
                      paddingLeft: 10,
                      borderColor: '#808080',
                      borderWidth: 0.5,
                      borderStyle: 'solid',
                      borderRadius: 5,
                      backgroundColor: '#f5f5f5',
                      width: '100%',
                    }}
                    placeholderTextColor="#808080"
                    autoCapitalize="none"
                  />
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '100%',
                    marginVertical: 5,
                  }}
                >
                  <Text style={{ paddingLeft: 5 }}>Email</Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={{
                      height: 40,
                      marginVertical: 8,
                      padding: 8,
                      paddingLeft: 10,
                      borderColor: '#808080',
                      borderWidth: 0.5,
                      borderStyle: 'solid',
                      borderRadius: 5,
                      backgroundColor: '#f5f5f5',
                      width: '100%',
                    }}
                    placeholderTextColor="#808080"
                    autoCapitalize="none"
                  />
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '100%',
                    marginVertical: 5,
                  }}
                >
                  <Text style={{ paddingLeft: 5 }}>Cell Number</Text>
                  <TextInput
                    value={cellNumber}
                    onChangeText={setCellNumber}
                    style={{
                      height: 40,
                      marginVertical: 8,
                      padding: 8,
                      paddingLeft: 10,
                      borderColor: '#808080',
                      borderWidth: 0.5,
                      borderStyle: 'solid',
                      borderRadius: 5,
                      backgroundColor: '#f5f5f5',
                      width: '100%',
                    }}
                    placeholderTextColor="#808080"
                    autoCapitalize="none"
                  />
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '100%',
                    marginVertical: 5,
                  }}
                >
                  <Text style={{ paddingLeft: 5 }}>University</Text>
                  <TextInput
                    value={university}
                    onChangeText={setUniversity}
                    style={{
                      height: 40,
                      marginVertical: 8,
                      padding: 8,
                      paddingLeft: 10,
                      borderColor: '#808080',
                      borderWidth: 0.5,
                      borderStyle: 'solid',
                      borderRadius: 5,
                      backgroundColor: '#f5f5f5',
                      width: '100%',
                    }}
                    placeholderTextColor="#808080"
                    autoCapitalize="none"
                  />
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '100%',
                    marginVertical: 5,
                  }}
                >
                  <Text style={{ paddingLeft: 5 }}>Student Number</Text>
                  <TextInput
                    value={studentNumber}
                    onChangeText={setStudentNumber}
                    style={{
                      height: 40,
                      marginVertical: 8,
                      padding: 8,
                      paddingLeft: 10,
                      borderColor: '#808080',
                      borderWidth: 0.5,
                      borderStyle: 'solid',
                      borderRadius: 5,
                      backgroundColor: '#f5f5f5',
                      width: '100%',
                    }}
                    placeholderTextColor="#808080"
                    autoCapitalize="none"
                  />
                </View>
                <Pressable
                  style={{
                    width: '100%',
                    backgroundColor: '#188aed',
                    borderRadius: 30,
                    marginTop: 10,
                    paddingVertical: 10,
                  }}
                  onPress={saveProfile}
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: '600',
                      textAlign: 'center',
                    }}
                  >
                    Save
                  </Text>
                </Pressable>
              </ScrollView>
            </View>
          </View>
        )
      )}
    </SafeAreaView>
  );
}

export default EditProfile;
