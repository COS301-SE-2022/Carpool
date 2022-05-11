import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  USER_LOGIN,
  USER_REGISTER,
  VERIFY_EMAIL,
} from '../queries/auth-queries';
import * as SecureStore from 'expo-secure-store';
import { User } from '@carpool/client/store';

export type Error = {
  message: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserRegister = {
  name: string;
  surname: string;
  email: string;
  university: string;
  studentNumber: string;
  password: string;
};

export type Verify = {
  id: string;
  code: string;
};

export const fetchStorage = createAsyncThunk('store/initialise', async () => {
  const user = await SecureStore.getItemAsync('user');

  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
});

export const login = createAsyncThunk<User, UserLogin, { rejectValue: Error }>(
  'users/login',
  async (user: UserLogin, thunkApi) => {
    const response = await axios.post('http://localhost:3333/graphql', {
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

export const register = createAsyncThunk(
  'users/register',
  async (user: UserRegister) => {
    const response = await axios.post('http://localhost:3333/graphql', {
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

export const verifyEmail = createAsyncThunk(
  'users/verify',
  async (verify: Verify) => {
    const storedCode = await SecureStore.getItemAsync('user');

    if (storedCode && JSON.parse(storedCode).verificationCode === verify.code) {
      const response = await axios.post('http://localhost:3333/graphql', {
        query: VERIFY_EMAIL,
        variables: {
          id: verify.id,
        },
      });

      console.log('VERIFYING');

      console.log(response);

      const res = response.data.data.verifyEmail;

      console.log(res);

      // SecureStore.setItemAsync('user', JSON.stringify(res));

      return res;
    }
  }
);
