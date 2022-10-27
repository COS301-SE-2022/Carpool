import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { DRIVER_PROFILE } from '../queries/driver-queries';
import { url } from '../config';
import { DriverProfile } from '../types/driver-types';
import { Platform } from 'react-native';

const host = 'https://carpoolcos301.herokuapp.com';
// const host = 'http://localhost:3333';
// const host = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

export const fetchDriverProfile = createAsyncThunk<
  DriverProfile,
  string,
  { rejectValue: Error }
>('drivers/profile', async (userId: string, thunkApi) => {
  console.log('userId', userId);

  const response = await axios.post(`${host}/graphql`, {
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

type ImageUploadType = {
  image: FormData;
  id: string;
};

export const uploadDriversLicense = createAsyncThunk<
  string,
  ImageUploadType,
  { rejectValue: Error }
>('drivers/image', async (imageUpload: ImageUploadType, thunkApi) => {
  const response = await axios.post(`${host}/api`, imageUpload.image, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log('FETCHING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = `https://carpoolcos301.herokuapp.com/api/${response.data.key}`;

  console.log(res);

  return res;
});
