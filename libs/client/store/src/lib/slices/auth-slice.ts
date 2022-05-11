import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../types/auth-types';
import {
  login,
  register,
  fetchStorage,
  verifyEmail,
} from '../actions/auth-actions';

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
        }
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: 'Unknown error' };
        }
      })
      .addCase(register.pending, (state, action) => {
        if (state.status === 'idle') {
          console.log('IDLE');
          state.status = 'loading';
        }
      })
      .addCase(register.fulfilled, (state, action) => {
        if (state.status === 'loading') {
          console.log('SUCCESS');
          state.status = 'success';
          state.user = action.payload;
        }
      })
      .addCase(register.rejected, (state, action) => {
        if (state.status === 'loading') {
          console.log('FAIL');
          state.status = 'idle';
          // state.error = action.error;
        }
      })
      .addCase(fetchStorage.rejected, (state, action) => {
        if (state.status === 'loading') {
          console.log('FAIL');
          state.status = 'idle';
          // state.error = action.error;
        }
      })
      .addCase(fetchStorage.fulfilled, (state, action) => {
        if (state.status === 'loading') {
          console.log('SUCCESS');
          state.status = 'idle';
          state.user = action.payload;
        }
      })
      .addCase(fetchStorage.pending, (state, action) => {
        if (state.status === 'idle') {
          console.log('IDLE');
          state.status = 'loading';
          // state.error = action.error;
        }
      })
      .addCase(verifyEmail.pending, (state, action) => {
        if (state.status === 'idle') {
          console.log('IDLE');
          state.status = 'loading';
          // state.error = action.error;
        }
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        if (state.status === 'loading') {
          console.log('SUCCESS');
          state.status = 'success';
          // state.user = action.payload;
        }
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        if (state.status === 'loading') {
          console.log('FAIL');
          state.status = 'idle';
          // state.error = action.error;
        }
      });
  },
});
