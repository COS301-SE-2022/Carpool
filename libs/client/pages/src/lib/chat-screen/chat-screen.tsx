import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { ChatScreenProps } from '../NavigationTypes/navigation-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { RootStore } from '@carpool/client/store';
import { Message } from '@carpool/client/store';
import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';
import { getTime } from '@carpool/client/shared/utilities';

const GET_MESSAGES = gql`
  query GetMessages($senderId: String!, $receiverId: String!) {
    getMessages(senderId: $senderId, receiverId: $receiverId) {
      id
      message
      senderId
      receiverId
      sender {
        id
        name
        surname
      }
      receiver {
        id
        name
        surname
      }
      createdAt
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation createMessage(
    $senderId: String!
    $receiverId: String!
    $message: String!
  ) {
    createMessage(
      senderId: $senderId
      receiverId: $receiverId
      message: $message
    ) {
      id
      message
      senderId
      receiverId
      sender {
        id
        name
      }
      receiver {
        id
        name
      }
      createdAt
    }
  }
`;

const MSG_SUB = gql`
  subscription Subscription {
    messageSent {
      id
      message
      senderId
      receiverId
      sender {
        id
        name
        surname
      }
      receiver {
        id
        name
        surname
      }
      createdAt
    }
  }
`;

export function ChatScreen({ navigation, route }: ChatScreenProps) {
  const { senderId, receiverId } = route.params;

  const [messages, setMessages] = useState<Message[]>([]);

  const [name, setName] = useState('');

  const { data, loading, error } = useQuery(GET_MESSAGES, {
    variables: { senderId, receiverId },
    onCompleted(data) {
      console.log(data);

      setMessages(data.getMessages);

      if (data.getMessages.length > 0) {
        data.getMessages[0].receiverId === receiverId
          ? setName(
              `${data.getMessages[0].receiver.name} ${data.getMessages[0].receiver.surname}`
            )
          : setName(
              `${data.getMessages[0].sender.name} ${data.getMessages[0].sender.surname}`
            );
      }
    },
  });

  const userState = useSelector((state: RootStore) => state.user);
  const { user } = userState;

  const [message, setMessage] = useState('');

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    variables: { senderId, receiverId, message },
    onCompleted(data) {
      setMessage('');
    },
  });

  const { data: subData } = useSubscription(MSG_SUB, {
    onSubscriptionData({ subscriptionData: { data } }) {
      if (
        (data.messageSent.receiverId === receiverId &&
          data.messageSent.senderId === senderId) ||
        (data.messageSent.receiverId === senderId &&
          data.messageSent.senderId === receiverId)
      ) {
        setMessages((prevMessages) => [...prevMessages, data.messageSent]);
      }
    },
  });

  return (
    <View style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {loading ? (
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
        user && (
          <>
            <View style={[styles.shadow, styles.flexRow, styles.topBar]}>
              <Icon
                name="arrow-left"
                size={22}
                style={{ color: '#fff', flex: 1 }}
                onPress={() => navigation.goBack()}
              />
              <View style={{ flex: 5 }}>
                <Text style={styles.textSmallWhite} numberOfLines={2}>
                  {name}
                </Text>
              </View>
            </View>
            <View style={{ backgroundColor: '#f2f2f2', flex: 10, padding: 15 }}>
              {messages.map((message: Message) => (
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
                        paddingTop: 10,
                        paddingHorizontal: 10,
                        borderRadius: 8,
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        // justifyContent: 'flex-end',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.shadow,
                        {
                          color: '#fff',
                          lineHeight: 20,
                          fontSize: 15,
                        },
                      ]}
                    >
                      {message.message}
                    </Text>
                    <Text
                      style={{
                        color: '#dbdbdb',
                        lineHeight: 20,
                        fontSize: 12,
                        marginLeft: 10,
                        textAlign: 'right',
                      }}
                    >
                      {getTime(message.createdAt)}
                    </Text>
                  </View>
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
                onPress={() =>
                  sendMessage({
                    variables: {
                      senderId,
                      receiverId,
                      message,
                    },
                  })
                }
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
