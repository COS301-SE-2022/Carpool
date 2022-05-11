import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { USER_LOGIN, USER_REGISTER } from '../queries/auth-queries';

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

    return response.data.data.register;
  }
);
