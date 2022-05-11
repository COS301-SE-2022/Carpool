import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { USER_LOGIN, USER_REGISTER } from '../queries/auth-queries';
import * as SecureStore from 'expo-secure-store';
import { User } from '@carpool/client/store';
import { responsePathAsArray } from 'graphql';

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
  password: string;
  university: string;
  studentNumber: string;
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
        password: user.password,
        university: user.university,
        studentNumber: user.studentNumber,
      },
    });

    console.log('ADDING');

    const res = response.data.data.register;

    SecureStore.setItemAsync('user', JSON.stringify(res));

    return res;
  }
);
