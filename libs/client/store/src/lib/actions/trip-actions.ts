import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  LIST_TRIPS,
  PASSENGER_HISTORY,
  TRIP_DETAILS,
  DRIVER_HISTORY,
  UPCOMING_TRIP,
  SEARCH_RESULTS,
} from '../queries/trip-queries';
import * as SecureStore from 'expo-secure-store';
import {
  TripListType,
  TripDetailsType,
  TripUpcomingType,
} from '../types/trip-types';

export const listTrips = createAsyncThunk<
  TripListType[],
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

  const res = response.data.data.findAllTrips;

  SecureStore.deleteItemAsync('trips');
  SecureStore.setItemAsync('trips', JSON.stringify(res));

  return res;
});

export const listDriverHistory = createAsyncThunk<
  TripListType[],
  string,
  { rejectValue: Error }
>('trips/history', async (tripId: string, thunkApi) => {
  const response = await axios.post('http://localhost:3333/graphql', {
    query: DRIVER_HISTORY,
    variables: {
      id: tripId,
    },
  });
  console.log('FETCHING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = response.data.data.findByDriver;

  return res;
});

export type SearchInput = {
  date: string;
  startLongitude: string;
  startLatitude: string;
  destinationLongitude: string;
  destinationLatitude: string;
};

export const listSearchResults = createAsyncThunk<
  TripListType[],
  SearchInput,
  { rejectValue: Error }
>('trips/search', async (search: SearchInput, thunkApi) => {
  const response = await axios.post('http://localhost:3333/graphql', {
    query: SEARCH_RESULTS,
    variables: {
      date: search.date,
      startLongitude: search.startLongitude,
      startLatitude: search.startLatitude,
      destinationLongitude: search.destinationLongitude,
      destinationLatitude: search.destinationLatitude,
    },
  });
  console.log('FETCHING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = response.data.data.searchTrips;

  return res;
});

export const listPassengerHistory = createAsyncThunk<
  TripListType[],
  string,
  { rejectValue: Error }
>('trips/history', async (tripId: string, thunkApi) => {
  const response = await axios.post('http://localhost:3333/graphql', {
    query: PASSENGER_HISTORY,
    variables: {
      id: tripId,
    },
  });
  console.log('FETCHING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = response.data.data.findByPassenger;

  return res;
});

export const fetchUpcomingTrip = createAsyncThunk<
  TripUpcomingType,
  undefined,
  { rejectValue: Error }
>('trips/upcoming', async (__, thunkApi) => {
  const response = await axios.post('http://localhost:3333/graphql', {
    query: UPCOMING_TRIP,
  });

  console.log('FETCHING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = response.data.data.findUpcomingTrip;

  // SecureStore.deleteItemAsync('trips');
  // SecureStore.setItemAsync('trips', JSON.stringify(res));

  return res;
});

export const fetchTripDetails = createAsyncThunk<
  TripDetailsType,
  string,
  { rejectValue: Error }
>('trip/details', async (tripId: string, thunkApi) => {
  const response = await axios.post('http://localhost:3333/graphql', {
    query: TRIP_DETAILS,
    variables: {
      id: tripId,
    },
  });
  console.log('FETCHING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = response.data.data.findTripById;

  console.log(res);

  return res;
});
