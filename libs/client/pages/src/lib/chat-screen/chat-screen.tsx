import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { ChatScreenProps } from '../NavigationTypes/navigation-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  getMessages,
  RootStore,
  sendMessage,
} from '@carpool/client/store';

export function ChatScreen({ navigation, route }: ChatScreenProps) {
  const { senderId, receiverId } = route.params;

  const dispatch: AppDispatch = useDispatch();

  const messagesState = useSelector((state: RootStore) => state.messages);
  const { messages, status } = messagesState;

  const messageState = useSelector((state: RootStore) => state.message);
  const { status: messageStatus } = messageState;

  const userState = useSelector((state: RootStore) => state.user);
  const { user } = userState;

  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(getMessages({ senderId, receiverId }));
  }, [dispatch, senderId, receiverId]);

  const sendMessageHandler = () => {
    dispatch(sendMessage({ senderId, receiverId, message }));
  };

  return (
    <View style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {status === 'loading' ? (
        <View
          style={[
            styles.flexRow,
            {
              height: '100%',
              width: '100%',
            },
          ]}
        >
          <ActivityIndicator size="large" color="#188aed" />
        </View>
      ) : (
        messages &&
        user &&
        messages.length > 0 && (
          <>
            <View style={[styles.shadow, styles.flexRow, styles.topBar]}>
              <Icon
                name="arrow-left"
                size={22}
                style={{ color: '#fff', flex: 1 }}
                onPress={() => navigation.goBack()}
              />
              <View style={{ flex: 4 }}>
                <Text style={styles.textSmallWhite} numberOfLines={2}>
                  {messages[0].receiver.name}
                </Text>
              </View>
            </View>
            <View style={{ backgroundColor: '#f2f2f2', flex: 10, padding: 15 }}>
              {messages.map((message) => (
                <View
                  key={message.id}
                  style={{
                    maxWidth: '50%',
                    marginVertical: 2,
                    alignSelf:
                      message.senderId === user.id ? 'flex-end' : 'flex-start',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <View
                    style={[
                      styles.shadow,
                      {
                        backgroundColor: '#188aed',
                        paddingVertical: 6,
                        paddingHorizontal: 10,
                        borderRadius: 8,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.shadow,
                        {
                          color: '#fff',
                          lineHeight: 20,
                        },
                      ]}
                    >
                      {message.message}
                    </Text>
                  </View>
                  <Text style={{ color: '#999', lineHeight: 20, fontSize: 12 }}>
                    {message.createdAt}
                  </Text>
                </View>
              ))}
            </View>
            <View
              style={[
                styles.shadow,
                {
                  backgroundColor: '#333',
                  flex: 1.5,
                  paddingHorizontal: 15,
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                },
              ]}
            >
              <TextInput
                value={message}
                placeholder="type a message"
                onChangeText={setMessage}
                style={{
                  backgroundColor: '#fff',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderRadius: 50,
                  marginTop: -15,
                  flex: 6,
                }}
                placeholderTextColor="#808080"
                autoCapitalize="none"
              />
              <Icon
                name="send-circle"
                size={40}
                style={{
                  color: '#188aed',
                  flex: 1,
                  marginLeft: 5,
                  marginTop: -15,
                }}
                onPress={sendMessageHandler}
              />
            </View>
          </>
        )
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  topBar: {
    backgroundColor: '#188aed',
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 25,
    paddingHorizontal: 30,
    zIndex: 20,
  },
  textLargeWhite: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 35,
    marginBottom: 5,
  },
  textSmallWhite: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 20,
  },
});

export default ChatScreen;
