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
  PASSENGER_REVIEWS,
  DRIVER_REVIEWS,
  PASSENGER_REVIEW_UPDATE,
  POST_REVIEW,
  LIST_ALL_PASSENGERS,
  DRIVER_REVIEW_UPDATE,
  UPDATE_AVGRATING,
} from '../queries/trip-queries';
import {
  TripListType,
  TripDetailsType,
  Passenger,
  TripRequestType,
  PassengerListType,
  PassengerList,
  UserRating
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

  // SecureStore.deleteItemAsync('trips');
  // SecureStore.setItemAsync('trips', JSON.stringify(res));

  return res;
});

export const listTripRequests = createAsyncThunk<
  TripRequestType[],
  string,
  { rejectValue: Error }
>('trips/listRequests', async (userId, thunkApi) => {
  const response = await axios.post(`http://${host}:3333/graphql`, {
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

export const findUpcomingTrip = createAsyncThunk<
  TripListType,
  string,
  { rejectValue: Error }
>('tripUpcoming/listUpcoming', async (id: string, thunkApi) => {
  const response = await axios.post(`http://${host}:3333/graphql`, {
    query: UPCOMING_TRIP,
    variables: {
      id,
    },
  });
  console.log('FETCHING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = response.data.data.findUpcomingTrip;

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

export const listPassengerReviews = createAsyncThunk<
  TripListType[],
  string,
  { rejectValue: Error }
>('trips/PassengerReviews', async (tripId: string, thunkApi) => {
  const response = await axios.post(`http://${host}:3333/graphql`, {
    query: PASSENGER_REVIEWS,
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

  const res = response.data.data.findByPassengerReviews;

  return res;
});

export const listAllPassengers = createAsyncThunk<
PassengerListType[],
  string,
  { rejectValue: Error }
>('trips/AllPassengers', async (tripId: string, thunkApi) => {
  const response = await axios.post(`http://${host}:3333/graphql`, {
    query: LIST_ALL_PASSENGERS,
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

  const res = response.data.data.findAllPassengers[0].passengers;
  console.log(res);
  return res;
});

export const listDriverReviews = createAsyncThunk<
  TripListType[],
  string,
  { rejectValue: Error }
>('trips/DriverReviews', async (DriverId: string, thunkApi) => {
  const response = await axios.post(`http://${host}:3333/graphql`, {
    query: DRIVER_REVIEWS,
    variables: {
      id: DriverId,
    },
  });
  console.log('FETCHING');

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  const res = response.data.data.findByDriverReviews;

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

  const response = await axios.post(`http://${host}:3333/graphql`, {
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

  // console.log(response);

  const res = response.data.data.findBookingByTripAndUserId.bookingId;

  // console.log(res);

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

// export const fetchUpcomingTrip = createAsyncThunk<
//   TripUpcomingType,
//   undefined,
//   { rejectValue: Error }
// >('trips/upcoming', async (__, thunkApi) => {
//   const response = await axios.post(`${url}/graphql`, {
//     query: UPCOMING_TRIP,
//   });

//   console.log('FETCHING');

//   if (response.data.errors) {
//     const error = {
//       message: response.data.errors[0].message,
//     } as Error;

//     return thunkApi.rejectWithValue(error);
//   }

//   const res = response.data.data.findUpcomingTrip;

//   // SecureStore.deleteItemAsync('trips');
//   // SecureStore.setItemAsync('trips', JSON.stringify(res));

//   return res;
// });

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
  id: string;
  bookingId: string;
};

export const acceptTripRequest = createAsyncThunk<
  string,
  AcceptTripReqType,
  { rejectValue: Error }
>('trip/accept', async ({ id, bookingId }, thunkApi) => {
  const response = await axios.post(`http://${host}:3333/graphql`, {
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
  const response = await axios.post(`http://${host}:3333/graphql`, {
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
  const response = await axios.post(`http://${host}:3333/graphql`, {
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
  const response = await axios.post(`http://${host}:3333/graphql`, {
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

  const response = await axios.post(`http://${host}:3333/graphql`, {
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

export const updateReviewPassenger = createAsyncThunk<
  Passenger[],
  string,
  { rejectValue: Error }
>('trips/updateReviewPassenger', async (bookingId: string, thunkApi) => {
  console.log('updating Review Passenger');

  const response = await axios.post(`http://${host}:3333/graphql`, {
    query: PASSENGER_REVIEW_UPDATE,
    variables: {
      bookingId: bookingId,
    },
  });

  console.log('UPDATING');

  //console.log(response);

  const res = response.data.data.updateReviewPassenger;

  return res;
});

export const updateReviewDriver = createAsyncThunk<
  Passenger[],
  string,
  { rejectValue: Error }
>('trips/updateReviewDriver', async (tripId: string, thunkApi) => {
  console.log('updating Review Driver');

  const response = await axios.post(`http://${host}:3333/graphql`, {
    query: DRIVER_REVIEW_UPDATE,
    variables: {
      tripId: tripId,
    },
  });

  console.log('UPDATING');

  //console.log(response);

  const res = response.data.data.updateReviewDriver;

  return res;
});

export const updateAvgRating = createAsyncThunk<
  UserRating,
  string,
  { rejectValue: Error }
>('reviews/updateAvgRating', async (id: string, thunkApi) => {

  const response = await axios.post(`http://${host}:3333/graphql`, {
    query: UPDATE_AVGRATING ,
    variables: {
      id: id,
    },
  });

  console.log('UPDATING');
  const res = response.data.data.updateAvgRating;
  console.log(res);

  return res;
});

export type PostReviewType = {
  byId: string;
  forId: string;
  tripId: string;
  role: string;
  comment: string;
  rating: string;
};

export type ReviewReturn = {
  id: string;
};
export const postReview = createAsyncThunk<
  string,
  PostReviewType,
  { rejectValue: Error }
>('postReview/review', async (review: PostReviewType, { rejectWithValue }) => {
  const response = await axios.post(`http://${host}:3333/graphql`, {
    query: POST_REVIEW,
    variables: {
      byId: review.byId,
      forId: review.forId,
      tripId: review.tripId,
      role: review.role,
      comment: review.comment,
      rating: review.rating,
    },
  });

  if (response.data.errors) {
    const error = {
      message: response.data.errors[0].message,
    } as Error;

    return rejectWithValue(error);
  }

  const res = response.data.data.postReview.id;

  return res;
});
