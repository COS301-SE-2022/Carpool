import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GET_WEATHER } from '../queries/weather-queries';
import { Weather } from '../types/weather-types';
import { Platform } from 'react-native';
import { url } from '../config';

const host = 'https://carpoolcos301.herokuapp.com';
// const host = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

type WeatherInput = {
  lat: string;
  long: string;
};

export const getWeather = createAsyncThunk<
  Weather,
  WeatherInput,
  { rejectValue: Error }
>('weather/getWeather', async ({ lat, long }: WeatherInput, thunkApi) => {
  const response = await axios.post(`${host}/graphql`, {
    query: GET_WEATHER,
    variables: {
      long: long,
      lat: lat,
    },
  });
  console.log('FETCHING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = response.data.data.getWeather;

  return res;
});
