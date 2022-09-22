import { createSlice } from '@reduxjs/toolkit';
import { login } from '../actions/auth-actions';

type Error = {
  message: string;
};

type UserState = {
  user: User | null;
  status: 'idle' | 'loading' | 'success' | 'failed';
  error: Error | null;
};

type User = {
  id: string;
  token?: string;
  email: string;
  isDriver: boolean;
};
const userInfoFromStorage = localStorage.getItem('userInfo');

export const initialState = {
  user: userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null,
  status: 'idle',
  error: null,
} as UserState;

export const userLoginSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
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
