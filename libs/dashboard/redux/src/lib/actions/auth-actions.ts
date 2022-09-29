import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ADMIN_LOGIN } from '../queries/dashboard-queries';
import { AdminUser } from '../types/dashboard-types';

export type UserLogin = {
  email: string;
  password: string;
};

export const login = createAsyncThunk<
  AdminUser,
  UserLogin,
  { rejectValue: Error }
>('users/login', async (user: UserLogin, thunkApi) => {
  console.log(user);

  const response = await axios.post(`http://localhost:3333/graphql`, {
    query: ADMIN_LOGIN,
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

  const res = response.data.data.adminLogin;

  localStorage.setItem('userInfo', JSON.stringify(res));

  return res;
});

export const logout = createAsyncThunk('users/logout', async () => {
  localStorage.removeItem('userInfo');
  return null;
});
