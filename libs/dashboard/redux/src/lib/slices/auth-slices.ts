import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from '../actions/auth-actions';
import { UserState } from '../types/dashboard-types';

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
      })
      .addCase(logout.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.user = action.payload;
      })
      .addCase(logout.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
      });
  },
});
