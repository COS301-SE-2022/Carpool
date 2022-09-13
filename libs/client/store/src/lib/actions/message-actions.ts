import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  GET_MESSAGES,
  SEND_MESSAGE,
  GET_CHATS,
} from '../queries/message-queries';
import { Platform } from 'react-native';
import { Message, Chat } from '../types/message-types';
import { url } from '../config';

const host =
  Platform.OS === 'ios' ? 'https://a5a7-102-33-32-76.eu.ngrok.io' : '10.0.2.2';

export type GetMessageInput = {
  senderId: string;
  receiverId: string;
};

export type SendMessageInput = {
  senderId: string;
  receiverId: string;
  message: string;
};

export const getMessages = createAsyncThunk<
  Message[],
  GetMessageInput,
  { rejectValue: Error }
>('messages/getMessages', async (message: GetMessageInput, thunkApi) => {
  const response = await axios.post(`${url}/graphql`, {
    query: GET_MESSAGES,
    variables: {
      senderId: message.senderId,
      receiverId: message.receiverId,
    },
  });
  console.log('FETCHING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = response.data.data.getMessages;

  return res;
});

export const getChats = createAsyncThunk<
  Chat[],
  string,
  { rejectValue: Error }
>('chats/getChats', async (userId: string, thunkApi) => {
  const response = await axios.post(`${url}/graphql`, {
    query: GET_CHATS,
    variables: {
      userId,
    },
  });
  console.log('FETCHING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = response.data.data.getChats;

  return res;
});

export const sendMessage = createAsyncThunk<
  Message,
  SendMessageInput,
  { rejectValue: Error }
>('messageSend/sendMessage', async (message: SendMessageInput, thunkApi) => {
  const response = await axios.post(`${url}/graphql`, {
    query: SEND_MESSAGE,
    variables: {
      senderId: message.senderId,
      receiverId: message.receiverId,
      message: message.message,
    },
  });
  console.log('FETCHING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = response.data.data.createMessage;

  return res;
});
