import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  LIST_TRIPS,
  PASSENGER_HISTORY,
  TRIP_DETAILS,
  DRIVER_HISTORY,
  UPCOMING_TRIP,
  CREATE_TRIP,
  SEARCH_RESULTS,
  BOOK_TRIP,
  CONFIRMED_TRIPS,
  REQUESTED_TRIPS,
  PAYMENT_STATUS_UPDATE,
  START_TRIP,
  END_TRIP,
  ACCEPT_REQ,
} from '../queries/trip-queries';
import * as SecureStore from 'expo-secure-store';
import {
  TripListType,
  TripDetailsType,
  TripUpcomingType,
  Passenger,
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

export const listConfirmedTrips = createAsyncThunk<
  TripListType[],
  string,
  { rejectValue: Error }
>('trips/checkout', async (tripId: string, thunkApi) => {
  const response = await axios.post(`http://${host}:3333/graphql`, {
    query: CONFIRMED_TRIPS,
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

  const res = response.data.data.findByConfirmedTrips;

  return res;
});

export const listRequestedTrips = createAsyncThunk<
  TripListType[],
  string,
  { rejectValue: Error }
>('trips/checkout', async (tripId: string, thunkApi) => {
  const response = await axios.post(`http://${host}:3333/graphql`, {
    query: REQUESTED_TRIPS,
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

  const res = response.data.data.findByRequestedTrips;

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

  return res;
});

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

export const createTrip = createAsyncThunk<
  string,
  TripCreate,
  { rejectValue: Error }
>('trip/create', async (trip: TripCreate, thunkApi) => {
  console.log(trip);

  const response = await axios.post(`http://${host}:3333/graphql`, {
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

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  console.log(response.data.data);

  const res = response.data.data.create.tripId;

  // SecureStore.setItemAsync('user', JSON.stringify(res));

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
};

export type tripID = {
  tripID: string;
};

export const bookTrip = createAsyncThunk<
  string,
  BookTripType,
  { rejectValue: Error }
>('trip/book', async (acceptTripRequestValues: BookTripType, thunkApi) => {
  const response = await axios.post(`http://${host}:3333/graphql`, {
    query: BOOK_TRIP,
    variables: {
      //bookingId: acceptTripRequestValues.bookingId,
      tripId: acceptTripRequestValues.tripId,
      passengerId: acceptTripRequestValues.passengerId,
      //bookingDate: acceptTripRequestValues.bookingDate,
      seatsBooked: acceptTripRequestValues.seatsBooked,
      status: acceptTripRequestValues.status,
      price: acceptTripRequestValues.price,
      address: acceptTripRequestValues.address,
      latitude: acceptTripRequestValues.latitude,
      longitude: acceptTripRequestValues.longitude,
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

export type AcceptTripReqType = {
  tripId: string;
  passengerId: string;
  seatsAvailable: string;
  status: string;
};

export const acceptTripRequest = createAsyncThunk<
  string,
  AcceptTripReqType,
  { rejectValue: Error }
>(
  'trip/accept',
  async (acceptTripRequestValues: AcceptTripReqType, thunkApi) => {
    const response = await axios.post(`http://${host}:3333/graphql`, {
      query: ACCEPT_REQ,
      variables: {
        tripId: acceptTripRequestValues.tripId,
        seatsAvailable: acceptTripRequestValues.seatsAvailable,
        status: acceptTripRequestValues.status,
      },
    });
    console.log('ACCEPTING');

    if (response.data.errors) {
      const error = {
        message: response.data.errors[0].message,
      } as Error;

      return thunkApi.rejectWithValue(error);
    }

    const res = response.data.data.acceptTripRequest;

    console.log(res);

    return res;
  }
);

export type TripStatusType = {
  tripId: string;
  status: string;
};

export const startTrip = createAsyncThunk<
  string,
  TripStatusType,
  { rejectValue: Error }
>('trip/start', async (tripStatusValues: TripStatusType, thunkApi) => {
  const response = await axios.post(`http://${host}:3333/graphql`, {
    query: START_TRIP,
    variables: {
      tripId: tripStatusValues.tripId,
      status: tripStatusValues.status,
    },
  });
  console.log('STARTING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = response.data.data.endTrip;

  console.log(res);

  return res;
});

export const endTrip = createAsyncThunk<
  string,
  TripStatusType,
  { rejectValue: Error }
>('trip/end', async (tripStatusValues: TripStatusType, thunkApi) => {
  const response = await axios.post(`http://${host}:3333/graphql`, {
    query: END_TRIP,
    variables: {
      tripId: tripStatusValues.tripId,
      status: tripStatusValues.status,
    },
  });
  console.log('ENDING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = response.data.data.endTrip;

  console.log(res);
});

export const updateBookingPaymentStatus = createAsyncThunk<
  Passenger[],
  string,
  { rejectValue: Error }
>('trips/checkout', async (bookingId: string, thunkApi) => {
  const response = await axios.post(`http://${host}:3333/graphql`, {
    query: PAYMENT_STATUS_UPDATE,
    variables: {
      id: bookingId,
    },
  });
  console.log('UPDATING');

  const res = response.data.data.updateBookingPaymentStatus;

  return res;
});
