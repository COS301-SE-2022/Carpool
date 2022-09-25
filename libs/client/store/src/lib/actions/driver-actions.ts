import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { DRIVER_PROFILE } from '../queries/driver-queries';
import { url } from '../config';
import { DriverProfile } from '../types/driver-types';
import { Platform } from 'react-native';

const host = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

export const fetchDriverProfile = createAsyncThunk<
  DriverProfile,
  string,
  { rejectValue: Error }
>('drivers/profile', async (userId: string, thunkApi) => {
  console.log('userId', userId);

  const response = await axios.post(`http://${host}:3333/graphql`, {
    query: DRIVER_PROFILE,
    variables: {
      userId,
    },
  });
  console.log('FETCHING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = response.data.data.findDriverProfile;

  return res;
});
