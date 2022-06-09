import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  LIST_TRIPS,
  PASSENGER_HISTORY,
  TRIP_DETAILS,
  DRIVER_HISTORY,
  UPCOMING_TRIP,
  SEARCH_RESULTS,
  BOOK_TRIP,
} from '../queries/trip-queries';
import * as SecureStore from 'expo-secure-store';
import {
  TripListType,
  TripDetailsType,
  TripUpcomingType,
} from '../types/trip-types';
import { Platform } from 'react-native';

const host = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

export const listTrips = createAsyncThunk<
  TripListType[],
  undefined,
  { rejectValue: Error }
>('trips/list', async (__, thunkApi) => {
  const response = await axios.post(`http://${host}:3333/graphql`, {
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
  const response = await axios.post(`http://${host}:3333/graphql`, {
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
  const response = await axios.post(`http://${host}:3333/graphql`, {
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
  const response = await axios.post(`http://${host}:3333/graphql`, {
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
  const response = await axios.post(`http://${host}:3333/graphql`, {
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
  const response = await axios.post(`http://${host}:3333/graphql`, {
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

export type BookTripType = {
  //bookingId: string;
  tripId: string;
  passengerId: string;
  //bookingDate: string;
  seatsBooked: string;
  status: string;
  price: string;
  address: string;
  latitude: string;
  longitude: string;
}

export type tripID = {
  tripID: string;
}

export const bookTrip = createAsyncThunk<
  string,
  BookTripType,
  { rejectValue: Error }
>('trip/book', async (bookTripValues: BookTripType, thunkApi) => {
  const response = await axios.post(`http://${host}:3333/graphql`, {
    query: BOOK_TRIP,
    variables: {
      //bookingId: bookTripValues.bookingId,
      tripId: bookTripValues.tripId,
      passengerId: bookTripValues.passengerId,
      //bookingDate: bookTripValues.bookingDate,
      seatsBooked: bookTripValues.seatsBooked,
      status: bookTripValues.status,
      price: bookTripValues.price,
      address: bookTripValues.address,
      latitude: bookTripValues.latitude,
      longitude: bookTripValues.longitude,
    },
  });
  console.log('BOOKING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = response.data.data.bookTrip;

  console.log(res);

  return res;
});
