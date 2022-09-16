import { createSlice } from '@reduxjs/toolkit';
import { getMessages, sendMessage, getChats } from '../actions/message-actions';
import {
  MessageState,
  MessageSendState,
  ChatState,
} from '../types/message-types';

const initialState = {
  messages: null,
  status: 'idle',
  error: null,
} as MessageState;

export const getMessagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: 'Unknown error' };
        }
      });
  },
});

const initialChatState = {
  chats: null,
  status: 'idle',
  error: null,
} as ChatState;

export const getChatsSlice = createSlice({
  name: 'chats',
  initialState: initialChatState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChats.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(getChats.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.chats = action.payload;
      })
      .addCase(getChats.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: 'Unknown error' };
        }
      });
  },
});

const initialSendState = {
  message: null,
  status: 'idle',
  error: null,
} as MessageSendState;

export const sendMessageSlice = createSlice({
  name: 'messageSend',
  initialState: initialSendState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.message = action.payload;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: 'Unknown error' };
        }
      });
  },
});
