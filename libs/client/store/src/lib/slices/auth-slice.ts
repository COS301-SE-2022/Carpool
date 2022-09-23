import { createSlice } from '@reduxjs/toolkit';
import {
  DriverState,
  UpdateUserType,
  UserProfileState,
  UserState,
  ForgotPasswordState,
  CheckCodeState,
} from '../types/auth-types';
import {
  login,
  register,
  fetchStorage,
  verifyEmail,
  logout,
  fetchUserProfile,
  createUpdateUser,
  registerDriver,
  forgotPassword,
  resetPasswordCode,
  resetPassword,
} from '../actions/auth-actions';

export const initialState = {
  user: null,
  status: 'idle',
  error: null,
} as UserState;

export const userLoginSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateDriverState: (state: any) => {
      state.user = {
        ...state.user,
        isDriver: true,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.user = action.payload;
        state.error = null;
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

export const forgotPasswordSlice = createSlice({
  name: 'userPassword',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  } as ForgotPasswordState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
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

export const checkCodeSlice = createSlice({
  name: 'userCode',
  initialState: {
    result: null,
    status: 'idle',
    error: null,
  } as CheckCodeState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPasswordCode.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
        state.error = null;
      })
      .addCase(resetPasswordCode.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.result = action.payload;
        state.error = null;
      })
      .addCase(resetPasswordCode.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
      });
  },
});

export const resetPasswordSlice = createSlice({
  name: 'userPasswordReset',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  } as ForgotPasswordState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
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

export const initialDriverState = {
  driver: null,
  status: 'idle',
  error: null,
} as DriverState;

export const driverRegisterSlice = createSlice({
  name: 'users',
  initialState: initialDriverState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerDriver.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(registerDriver.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.driver = action.payload;
      })
      .addCase(registerDriver.rejected, (state, action) => {
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

export const { updateDriverState } = userLoginSlice.actions;
