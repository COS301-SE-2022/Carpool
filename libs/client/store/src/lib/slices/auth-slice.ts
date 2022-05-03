import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../types/auth-types';
import { login } from '../actions/auth-actions';

export const initialState = {
  user: null,
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
        if (state.status === 'idle') {
          console.log('IDLE');
          state.status = 'loading';
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        if (state.status === 'loading') {
          console.log('SUCCESS');
          state.status = 'success';
          state.user = action.payload;
        }
      })
      .addCase(login.rejected, (state, action) => {
        if (state.status === 'loading') {
          console.log('FAIL');
          state.status = 'idle';
          // state.error = action.error;
        }
      });
  },
});
