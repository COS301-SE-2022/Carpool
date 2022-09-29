import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { ChatListProps } from '../NavigationTypes/navigation-types';
import { RootStore, AppDispatch, getChats } from '@carpool/client/store';

export function ChatList({ navigation }: ChatListProps) {
  const dispatch: AppDispatch = useDispatch();

  const chatState = useSelector((state: RootStore) => state.chats);
  const { chats, status } = chatState;

  const userState = useSelector((state: RootStore) => state.user);
  const { user } = userState;

  useEffect(() => {
    user && dispatch(getChats(user.id));
  }, [dispatch, user]);

  return (
    <SafeAreaView
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}
    >
      {status === 'loading' ? (
        <ActivityIndicator size="large" />
      ) : (
        <Fragment>
          <View style={{ paddingBottom: 20, paddingLeft: 20, paddingTop: 20 }}>
            <Text style={{ fontSize: 30, fontWeight: '600' }}>Messages</Text>
          </View>
          {chats &&
            user &&
            chats.map((chat) => (
              <View
                style={{
                  width: '100%',
                  padding: 15,
                  paddingLeft: 25,
                }}
                key={chat.userId}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ChatScreen', {
                      senderId: user.id,
                      receiverId: chat.userId,
                    })
                  }
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <View
                    style={{
                      borderRadius: 25,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    <Image
                      source={{ uri: chat.profilePic }}
                      resizeMode="cover"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 25,
                        marginRight: 15,
                      }}
                    />
                  </View>
                  <Text style={{ fontSize: 16, fontWeight: '500' }}>
                    {chat.name}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
        </Fragment>
      )}
    </SafeAreaView>
  );
}

export default ChatList;
