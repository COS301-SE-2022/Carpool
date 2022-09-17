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
  BOOKING_ID,
  ACCEPT_REQ,
  DECLINE_REQ,
  START_TRIP,
  END_TRIP,
  FIND_REQUESTS,
} from '../queries/trip-queries';
import {
  TripListType,
  TripDetailsType,
  TripUpcomingType,
  Passenger,
  TripRequestType,
} from '../types/trip-types';
import { Platform } from 'react-native';
import { url } from '../config';

const host =
  Platform.OS === 'ios' ? 'https://a5a7-102-33-32-76.eu.ngrok.io' : '10.0.2.2';

export const listTrips = createAsyncThunk<
  TripListType[],
  undefined,
  { rejectValue: Error }
>('trips/list', async (__, thunkApi) => {
  const response = await axios.post(`${url}/graphql`, {
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

  // SecureStore.deleteItemAsync('trips');
  // SecureStore.setItemAsync('trips', JSON.stringify(res));

  return res;
});

export const listTripRequests = createAsyncThunk<
  TripRequestType[],
  string,
  { rejectValue: Error }
>('trips/listRequests', async (userId, thunkApi) => {
  const response = await axios.post(`${url}/graphql`, {
    query: FIND_REQUESTS,
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

  const res = response.data.data.findAllTripRequests;

  // SecureStore.deleteItemAsync('trips');
  // SecureStore.setItemAsync('trips', JSON.stringify(res));

  return res;
});

export const listUpcomingTrips = createAsyncThunk<
  TripListType[],
  undefined,
  { rejectValue: Error }
>('trips/listUpcoming', async (__, thunkApi) => {
  const response = await axios.post(`${url}/graphql`, {
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

  const tripsArr: TripListType[] = [];

  res.map((trip: TripDetailsType) => {
    if (trip.status !== 'completed') {
      tripsArr.push(trip);
    }
  });

  // SecureStore.deleteItemAsync('trips');
  // SecureStore.setItemAsync('trips', JSON.stringify(res));

  return tripsArr.reverse();
});

export const listDriverHistory = createAsyncThunk<
  TripListType[],
  string,
  { rejectValue: Error }
>('trips/history', async (tripId: string, thunkApi) => {
  const response = await axios.post(`${url}/graphql`, {
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
  const response = await axios.post(`${url}/graphql`, {
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

type BookingIdInput = {
  tripId: string;
  userId: string;
};

export const findBookingId = createAsyncThunk<
  string,
  BookingIdInput,
  { rejectValue: Error }
>('trips/booking-id', async ({ tripId, userId }, thunkApi) => {
  console.log('FIND BOOKING ID');

  console.log(tripId);
  console.log(userId);

  const response = await axios.post(`${url}/graphql`, {
    query: BOOKING_ID,
    variables: {
      tripId: tripId,
      userId: userId,
    },
  });

  console.log('FETCHING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  console.log(response);

  const res = response.data.data.findBookingByTripAndUserId.bookingId;

  console.log(res);

  return res;
});

export const listRequestedTrips = createAsyncThunk<
  TripListType[],
  string,
  { rejectValue: Error }
>('trips/checkout', async (tripId: string, thunkApi) => {
  const response = await axios.post(`${url}/graphql`, {
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
  const response = await axios.post(`${url}/graphql`, {
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
  const response = await axios.post(`${url}/graphql`, {
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
  const response = await axios.post(`${url}/graphql`, {
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
  const response = await axios.post(`${url}/graphql`, {
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

  const response = await axios.post(`${url}/graphql`, {
    query: CREATE_TRIP,
    variables: {
      driver: trip.driver,
      tripDate: trip.tripDate,
      seatsAvailable: trip.seatsAvailable,
      price: trip.price,
      startLocationAddress: trip.startLocationAddress,
      startLocationLongitude: trip.startLocationLongitude,
      startLocationLatitude: trip.startLocationLatitude,
      destinationAddress: trip.destinationAddress,
      destinationLongitude: trip.destinationLongitude,
      destinationLatitude: trip.destinationLatitude,
      status: 'confirmed',
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
  const response = await axios.post(`${url}/graphql`, {
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
  id: string;
  bookingId: string;
};

export const acceptTripRequest = createAsyncThunk<
  string,
  AcceptTripReqType,
  { rejectValue: Error }
>('trip/accept', async ({ id, bookingId }, thunkApi) => {
  const response = await axios.post(`${url}/graphql`, {
    query: ACCEPT_REQ,
    variables: {
      id: id,
      bookingId: bookingId,
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
});

export type DeclineTripReqType = {
  bookingId: string;
};

export const declineTripRequest = createAsyncThunk<
  string,
  DeclineTripReqType,
  { rejectValue: Error }
>('trip/decline', async ({ bookingId }, thunkApi) => {
  const response = await axios.post(`${url}/graphql`, {
    query: DECLINE_REQ,
    variables: {
      bookingId: bookingId,
    },
  });
  console.log('ACCEPTING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = response.data.data.declineTripRequest;

  console.log(res);

  return res;
});

export type TripStatusType = {
  id: string;
};

export const startTrip = createAsyncThunk<
  string,
  TripStatusType,
  { rejectValue: Error }
>('trip/start', async ({ id }, thunkApi) => {
  const response = await axios.post(`${url}/graphql`, {
    query: START_TRIP,
    variables: {
      id: id,
    },
  });
  console.log('STARTING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = response.data.data.startTrip;

  console.log(res);

  return res;
});

export const endTrip = createAsyncThunk<
  string,
  TripStatusType,
  { rejectValue: Error }
>('trip/end', async ({ id }, thunkApi) => {
  const response = await axios.post(`${url}/graphql`, {
    query: END_TRIP,
    variables: {
      id: id,
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

export const updateBookingPaymentStatus = createAsyncThunk<
  Passenger[],
  string,
  { rejectValue: Error }
>('trips/updatePayment', async (bookingId: string, thunkApi) => {
  console.log('updating booking payment status');

  const response = await axios.post(`${url}/graphql`, {
    query: PAYMENT_STATUS_UPDATE,
    variables: {
      bookingId: bookingId,
    },
  });

  console.log('UPDATING');

  console.log(response);

  const res = response.data.data.updateBookingPaymentStatus;

  return res;
});

export type cancelDriverTripType = {
  tripId: string;
};

export type cancelPassengerTripType = {
  bookingId: string;
};

export const cancelDriverTrip = createAsyncThunk<
  string,
  cancelDriverTripType,
  { rejectValue: Error }
>('trip/cancel', async ({ tripId }, thunkApi) => {
  const response = await axios.post(`${url}/graphql`, {
    query: CANCEL_DRIVER_TRIP,
    variables: {
      tripId: tripId,
    },
  });
  console.log('CANCELING DRIVER TRIP');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = response.data.data.cancelTrip;

  console.log(res);

  return res;
});
