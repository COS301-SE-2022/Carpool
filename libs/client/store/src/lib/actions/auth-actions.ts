import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  USER_LOGIN,
  USER_PROFILE,
  USER_REGISTER,
  VERIFY_EMAIL,
  USER_UPDATE,
  DRIVER_REGISTER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from '../queries/auth-queries';
import * as SecureStore from 'expo-secure-store';
import { User, UserProfile, Driver } from '../types/auth-types';
import { Platform } from 'react-native';
import { updateDriverState } from '../slices/auth-slice';
import { url } from '../config';
import { ForgotPasswordType } from '../types/auth-types';

const host = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

export type UserLogin = {
  email: string;
  password: string;
};

export type UserProfileId = {
  id: string;
};

export type UserRegister = {
  name: string;
  surname: string;
  email: string;
  university: string;
  studentNumber: string;
  password: string;
  cellNumber: string;
};

export type DriverRegister = {
  ID: string;
  userId: string;
  licensePlate: string;
  carModel: string;
};

export type Verify = {
  id: string;
  code: string;
};

export const fetchStorage = createAsyncThunk('store/initialise', async () => {
  const user = await SecureStore.getItemAsync('user');

  if (user) {
    const response = await axios.post(`http://${host}:3333/graphql`, {
      query: USER_PROFILE,
      variables: {
        id: JSON.parse(user).id,
      },
    });

    console.log(response);

    if (response.data.data === null) {
      await SecureStore.deleteItemAsync('user');
      return null;
    }

    return JSON.parse(user);
  } else {
    return null;
  }
});

export const login = createAsyncThunk<User, UserLogin, { rejectValue: Error }>(
  'users/login',
  async (user: UserLogin, thunkApi) => {
    const response = await axios.post(`http://${host}:3333/graphql`, {
      query: USER_LOGIN,
      variables: {
        email: user.email,
        password: user.password,
      },
    });
    console.log('FETCHING');

    if (response.data.errors) {
      const error = {
        message: response.data.errors[0].message,
      } as Error;

      return thunkApi.rejectWithValue(error);
    }

    const res = response.data.data.login;

    SecureStore.deleteItemAsync('user');
    SecureStore.setItemAsync('user', JSON.stringify(res));

    return res;
  }
);

export const fetchUserProfile = createAsyncThunk<
  UserProfile,
  string,
  { rejectValue: Error }
>('users/profile', async (userId: string, thunkApi) => {
  const response = await axios.post(`http://${host}:3333/graphql`, {
    query: USER_PROFILE,
    variables: {
      id: userId,
    },
  });
  console.log('FETCHING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = response.data.data.findUserById;

  return res;
});

export const register = createAsyncThunk(
  'users/register',
  async (user: UserRegister) => {
    const response = await axios.post(`http://${host}:3333/graphql`, {
      query: USER_REGISTER,
      variables: {
        name: user.name,
        surname: user.surname,
        email: user.email,
        university: user.university,
        studentNumber: user.studentNumber,
        password: user.password,
      },
    });

    console.log('ADDING');

    const res = response.data.data.register;

    SecureStore.setItemAsync('user', JSON.stringify(res));

    return res;
  }
);

export const forgotPassword = createAsyncThunk<
  ForgotPasswordType,
  string,
  { rejectValue: Error }
>('userPassword/forgot', async (email: string, thunkApi) => {
  const response = await axios.post(`${url}/graphql`, {
    query: FORGOT_PASSWORD,
    variables: {
      email: email,
    },
  });

  console.log('FORGOT PASSWORD');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  console.log(response.data);

  const res = response.data.data.forgotPassword;

  SecureStore.setItemAsync('userForgot', JSON.stringify(res));

  return { email: res.email };
});

export const resetPasswordCode = createAsyncThunk(
  'userCode/verify',
  async (code: string) => {
    const storedCode = await SecureStore.getItemAsync('userForgot');

    if (storedCode && JSON.parse(storedCode).verificationCode === code) {
      return true;
    } else {
      return false;
    }
  }
);

export type ResetPasswordInput = {
  password: string;
  email: string;
};

export const resetPassword = createAsyncThunk<
  ForgotPasswordType,
  ResetPasswordInput,
  { rejectValue: Error }
>(
  'userPasswordReset/reset',
  async (resetInput: ResetPasswordInput, thunkApi) => {
    const response = await axios.post(`${url}/graphql`, {
      query: RESET_PASSWORD,
      variables: {
        email: resetInput.email,
        password: resetInput.password,
      },
    });

    if (response.data.errors) {
      const error = {
        message: response.data.errors[0].message,
      } as Error;

      return thunkApi.rejectWithValue(error);
    }

    console.log('FORGOT PASSWORD');

    const res = response.data.data.resetPassword;

    SecureStore.deleteItemAsync('userForgot');

    return res;
  }
);

export const registerDriver = createAsyncThunk<
  Driver,
  DriverRegister,
  { rejectValue: Error }
>(
  'users/registerDriver',
  async (driver: DriverRegister, { rejectWithValue, dispatch }) => {
    console.log('driver', driver);

    const response = await axios.post(`http://${host}:3333/graphql`, {
      query: DRIVER_REGISTER,
      variables: {
        ID: driver.ID,
        userId: driver.userId,
        licensePlate: driver.licensePlate,
        carModel: driver.carModel,
      },
    });

    console.log('ADDING');

    if (response.data.errors) {
      const error = {
        message: response.data.errors[0].message,
      } as Error;

      return rejectWithValue(error);
    }

    const res = response.data.data.registerDriver;

    dispatch(updateDriverState());

    return res;
  }
);

export const verifyEmail = createAsyncThunk(
  'users/verify',
  async (verify: Verify) => {
    const storedCode = await SecureStore.getItemAsync('user');

    console.log(storedCode);
    console.log(verify.code);

    if (storedCode && JSON.parse(storedCode).verificationCode === verify.code) {
      console.log('before query');
      const response = await axios.post(`http://${host}:3333/graphql`, {
        query: VERIFY_EMAIL,
        variables: {
          id: verify.id,
        },
      });

      console.log('after query');

      console.log('VERIFYING');

      console.log(response);

      const res = response.data.data.verifyEmail;

      console.log(res);

      // SecureStore.setItemAsync('user', JSON.stringify(res));

      return res;
    }
  }
);

export const logout = createAsyncThunk('users/logout', async () => {
  await SecureStore.deleteItemAsync('user');
  return null;
});

export type UserUpdate = {
  id: string;
  name: string;
  surname: string;
  email: string;
  university: string;
  studentNumber: string;
  cellNumber: string;
};

export const createUpdateUser = createAsyncThunk(
  'users/update',
  async (user: UserUpdate) => {
    const response = await axios.post(`http://${host}:3333/graphql`, {
      query: USER_UPDATE,
      variables: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        university: user.university,
        studentNumber: user.studentNumber,
        cellNumber: user.cellNumber,
      },
    });

    console.log('ADDING');

    const res = response.data.data.updateUser;

    return res;
  }
);
