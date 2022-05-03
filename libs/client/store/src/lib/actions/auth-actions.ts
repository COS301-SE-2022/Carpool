import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { USER_LOGIN } from '../queries/auth-queries';

export type UserLogin = {
  email: string;
  password: string;
};

export const login = createAsyncThunk(
  'users/login',
  async (user: UserLogin) => {
    const response = await axios.post('http://localhost:3333/graphql', {
      query: USER_LOGIN,
      variables: {
        email: user.email,
        password: user.password,
      },
    });
    console.log('FETCHING');

    return response.data.data.login;
  }
);
