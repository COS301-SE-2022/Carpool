import { createSlice } from '@reduxjs/toolkit';
import {
  UpdateUserType,
  UserProfileState,
  UserState,
} from '../types/auth-types';
import {
  login,
  register,
  fetchStorage,
  verifyEmail,
  logout,
  fetchUserProfile,
  createUpdateUser,
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
      .addCase(register.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        if (state.status === 'loading') {
          console.log('FAIL');
          state.status = 'idle';
          // state.error = action.error;
        }
      })
      .addCase(fetchStorage.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
        // state.error = action.error;
      })
      .addCase(fetchStorage.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(fetchStorage.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
        // state.error = action.error;
      })
      .addCase(verifyEmail.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
        // state.error = action.error;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        // state.user = action.payload;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'error';
        // state.error = action.error;
      })
      .addCase(logout.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'error';
        // state.error = action.error;
      })
      .addCase(logout.pending, (state, action) => {
        console.log('LOADING');
        state.status = 'idle';
        // state.error = action.error;
      })
      .addCase(logout.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.user = action.payload;
      });
  },
});

export const initialProfileState = {
  userProfile: null,
  status: 'idle',
  error: null,
} as UserProfileState;

export const userProfileSlice = createSlice({
  name: 'users',
  initialState: initialProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
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

export const initialUpdateState = {
  status: 'idle',
  error: null,
} as UpdateUserType;

export const userUpdateSlice = createSlice({
  name: 'users',
  initialState: initialUpdateState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUpdateUser.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(createUpdateUser.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        // state.userProfile = action.payload;
      })
      .addCase(createUpdateUser.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
      });
  },
});
