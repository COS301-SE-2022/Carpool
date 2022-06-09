import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  LIST_TRIPS,
  PASSENGER_HISTORY,
  TRIP_DETAILS,
  DRIVER_HISTORY,
  UPCOMING_TRIP,
  CREATE_TRIP,
} from '../queries/trip-queries';
import * as SecureStore from 'expo-secure-store';
import {
  TripListType,
  TripDetailsType,
  TripUpcomingType,
} from '../types/trip-types';

export type TripCreate = {
  driver: string;
  tripDate: string;
  seatsAvailable: string;
  price: string;
  startLocationAddress: string;
  startLocationLongitude: string;
  startLocationLatitude: string;
  destinationAddress: string;
  destinationLongitude: string;
  destinationLatitude: string;
};

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

export const createTrip = createAsyncThunk(
  'trips/create',
  async (trip: TripCreate) => {
    const response = await axios.post('http://localhost:3333/graphql', {
      query: CREATE_TRIP,
      variables: {
        driver: trip.driver,
        tripDate: trip.tripDate,
        seatsAvaiable: trip.seatsAvailable,
        price: trip.price,
        startLocationAddress: trip.startLocationAddress,
        startLocationLongitude: trip.startLocationLongitude,
        startLocationLatitude: trip.startLocationLatitude,
        destinationAddress: trip.destinationAddress,
        destinationLongitude: trip.destinationLongitude,
        destinationLatitude: trip.destinationLatitude,
      },
    });

    console.log('ADDING');

    const res = response.data.data.tripId;

    // SecureStore.setItemAsync('user', JSON.stringify(res));

    return res;
  }
);
