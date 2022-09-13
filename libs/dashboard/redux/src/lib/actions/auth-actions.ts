import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const USER_LOGIN = `
  query ($email: String!, $password: String!) {
     login(email: $email, password: $password) {
        id
        token
        email
        isDriver
     }
  }
`;

type User = {
  id: string;
  token?: string;
  email: string;
  isDriver: boolean;
};

export type UserLogin = {
  email: string;
  password: string;
};

export const login = createAsyncThunk<User, UserLogin, { rejectValue: Error }>(
  'users/login',
  async (user: UserLogin, thunkApi) => {
    const response = await axios.post(`https://localhost:3333/graphql`, {
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

    localStorage.setItem('userInfo', JSON.stringify(res.data));

    return res;
  }
);
