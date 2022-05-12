import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { LIST_TRIPS } from '../queries/trip-queries';
import * as SecureStore from 'expo-secure-store';
import { Trip } from '../types/trip-types';

export const listTrips = createAsyncThunk<
  Trip[],
  undefined,
  { rejectValue: Error }
>('trips/list', async (__, thunkApi) => {
  const response = await axios.post('http://localhost:3333/graphql', {
    query: LIST_TRIPS,
  });
  console.log('FETCHING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = response.data.data.listTrips;

  SecureStore.deleteItemAsync('trips');
  SecureStore.setItemAsync('trips', JSON.stringify(res));

  return res;
});
