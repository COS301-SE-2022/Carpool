import { createSlice } from '@reduxjs/toolkit';
import {
  TripBooking,
  TripDetails,
  TripList,
  AcceptTripRequest,
  StartTrip,
  EndTrip,
  UpdatePaymentStatusType,
  BookingIdType,
  DeclineTripRequest,
  CreateTripState,
  TripRequestState,
  UpcomingTripState,
  ReviewTripState,
  PassengerList,
} from '../types/trip-types';
import {
  createTrip,
  listTrips,
  fetchTripDetails,
  listDriverHistory,
  listPassengerHistory,
  listSearchResults,
  bookTrip,
  acceptTripRequest,
  startTrip,
  endTrip,
  listConfirmedTrips,
  listRequestedTrips,
  updateBookingPaymentStatus,
  findBookingId,
  declineTripRequest,
  listTripRequests,
  findUpcomingTrip,
  listPassengerReviews,
  listDriverReviews,
  updateReviewPassenger,
  updateReviewDriver,
  postReview,
  listAllPassengers,
} from '../actions/trip-actions';

export const initialState = {
  trips: null,
  status: 'idle',
  error: null,
} as TripList;

export const initialCreateState = {
  trip: '',
  status: 'idle',
  error: null,
} as CreateTripState;

export const createTripSlice = createSlice({
  name: 'trips',
  initialState: initialCreateState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTrip.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.trip = action.payload;
      })
      .addCase(createTrip.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: 'Unknown error' };
        }
      });
  },
});

export const tripListSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listTrips.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(listTrips.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.trips = action.payload;
      })
      .addCase(listTrips.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: 'Unknown error' };
        }
      });
  },
});

export const tripUpcomingSlice = createSlice({
  name: 'tripUpcoming',
  initialState: {
    trip: null,
    status: 'idle',
    error: null,
  } as UpcomingTripState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findUpcomingTrip.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(findUpcomingTrip.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.trip = action.payload;
      })
      .addCase(findUpcomingTrip.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: 'Unknown error' };
        }
      });
  },
});

export const initialDriverHistoryState = {
  trips: null,
  status: 'idle',
  error: null,
} as TripList;

export const driverHistorySlice = createSlice({
  name: 'trips',
  initialState: initialDriverHistoryState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listDriverHistory.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(listDriverHistory.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.trips = action.payload;
      })
      .addCase(listDriverHistory.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: 'Unknown error' };
        }
      });
  },
});

export const initialPassengerReviewState = {
  trips: null,
  status: 'idle',
  error: null,
} as TripList;

export const passengerReviewSlice = createSlice({
  name: 'trips',
  initialState: initialPassengerReviewState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listPassengerReviews.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(listPassengerReviews.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.trips = action.payload;
      })
      .addCase(listPassengerReviews.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: 'Unknown error' };
        }
      });
  },
});

export const initialAllPassengersState = {
  passengers: null,
  status: 'idle',
  error: null,
} as PassengerList;

export const getAllPassengersSlice = createSlice({
  name: 'list-passengers',
  initialState: initialAllPassengersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listAllPassengers.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(listAllPassengers.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
      })
      .addCase(listAllPassengers.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: 'Unknown error' };
        }
      });
  },
});

export const initialDriverReviewState = {
  trips: null,
  status: 'idle',
  error: null,
} as TripList;

export const DriverReviewSlice = createSlice({
  name: 'trips',
  initialState: initialDriverReviewState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listDriverReviews.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(listDriverReviews.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.trips = action.payload;
      })
      .addCase(listDriverReviews.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: 'Unknown error' };
        }
      });
  },
});

export const initialSearchResultsState = {
  trips: null,
  status: 'idle',
  error: null,
} as TripList;

export const searchResultsSlice = createSlice({
  name: 'trips',
  initialState: initialSearchResultsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listSearchResults.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(listSearchResults.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.trips = action.payload;
      })
      .addCase(listSearchResults.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: 'Unknown error' };
        }
      });
  },
});

export const initialPassengerHistoryState = {
  trips: null,
  status: 'idle',
  error: null,
} as TripList;

export const passengerHistorySlice = createSlice({
  name: 'trips',
  initialState: initialPassengerHistoryState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listPassengerHistory.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(listPassengerHistory.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.trips = action.payload;
      })
      .addCase(listPassengerHistory.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: 'Unknown error' };
        }
      });
  },
});

export const tripInitialState = {
  trip: null,
  status: 'idle',
  error: null,
} as TripDetails;

export const tripDetailsSlice = createSlice({
  name: 'trip',
  initialState: tripInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTripDetails.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(fetchTripDetails.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.trip = action.payload;
      })
      .addCase(fetchTripDetails.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: 'Unknown error' };
        }
      });
  },
});

export const tripBookingState = {
  tripId: null,
  status: 'idle',
  error: null,
} as TripBooking;

export const tripBookingSlice = createSlice({
  name: 'trip-booking',
  initialState: tripBookingState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookTrip.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(bookTrip.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.tripId = action.payload;
      })
      .addCase(bookTrip.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: 'Unknown error (Trip Booking)' };
        }
      });
  },
});

export const postReviewState = {
  review: null,
  status: 'idle',
  error: null,
} as ReviewTripState;

export const postReviewSlice = createSlice({
  name: 'postReview',
  initialState: postReviewState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postReview.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(postReview.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.review = action.payload;
      })
      .addCase(postReview.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: 'Unknown error' };
        }
      });
  },
});

export const acceptTripRequestState = {
  tripId: null,
  status: 'idle',
  error: null,
} as AcceptTripRequest;

export const acceptTripRequestSlice = createSlice({
  name: 'accept-trip-request',
  initialState: acceptTripRequestState,
  reducers: {
    resetAccept: () => acceptTripRequestState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(acceptTripRequest.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(acceptTripRequest.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.tripId = action.payload;
      })
      .addCase(acceptTripRequest.rejected, (state, action) => {
        state.error = { message: 'Unknown error (Accept Trip Request)' };
      });
  },
});

export const declineTripRequestState = {
  bookingId: null,
  status: 'idle',
  error: null,
} as DeclineTripRequest;

export const declineTripRequestSlice = createSlice({
  name: 'decline-trip-request',
  initialState: declineTripRequestState,
  reducers: {
    resetDecline: () => declineTripRequestState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(declineTripRequest.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(declineTripRequest.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.bookingId = action.payload;
      })
      .addCase(declineTripRequest.rejected, (state, action) => {
        state.error = { message: 'Unknown error (Accept Trip Request)' };
      });
  },
});

export const startTripState = {
  tripId: null,
  status: 'idle',
  error: null,
} as StartTrip;

export const startTripSlice = createSlice({
  name: 'start-trip',
  initialState: startTripState,
  reducers: {
    resetStart: () => startTripState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(startTrip.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(startTrip.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.tripId = action.payload;
      })
      .addCase(startTrip.rejected, (state, action) => {
        state.error = { message: 'Unknown error (Start Trip)' };
      });
  },
});

export const endTripState = {
  tripId: null,
  status: 'idle',
  error: null,
} as EndTrip;

export const endTripSlice = createSlice({
  name: 'end-trip',
  initialState: endTripState,
  reducers: {
    resetEnd: () => endTripState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(endTrip.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(endTrip.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.tripId = action.payload;
      })
      .addCase(endTrip.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
        if (action.payload) {
          //state.error = action.payload;
        } else {
          state.error = { message: 'Unknown error (End Trip)' };
        }
      });
  },
});

export const initialUpdatePaymentStatusState = {
  status: 'idle',
  error: null,
} as UpdatePaymentStatusType;

export const PaymentStatusUpdateSlice = createSlice({
  name: 'update-payment-status',
  initialState: initialUpdatePaymentStatusState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateBookingPaymentStatus.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(updateBookingPaymentStatus.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        // state.userProfile = action.payload;
      })
      .addCase(updateBookingPaymentStatus.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
      });
  },
});

export const initialUpdatePassengerReviewsState = {
  review: null,
  status: 'idle',
  error: null,
} as ReviewTripState;

export const UpdatePassengerReviewsSlice = createSlice({
  name: 'update-passenger-reviews',
  initialState: initialUpdatePassengerReviewsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateReviewPassenger.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(updateReviewPassenger.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        // state.userProfile = action.payload;
      })
      .addCase(updateReviewPassenger.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
      });
  },
});

export const initialUpdateDriverReviewsState = {
  review: null,
  status: 'idle',
  error: null,
} as ReviewTripState;

export const UpdateDriverReviewsSlice = createSlice({
  name: 'update-driver-reviews',
  initialState: initialUpdateDriverReviewsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateReviewDriver.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(updateReviewDriver.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        // state.userProfile = action.payload;
      })
      .addCase(updateReviewDriver.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
      });
  },
});

export const initialRequestedTripState = {
  trips: null,
  status: 'idle',
  error: null,
} as TripList;

export const requestedTripSlice = createSlice({
  name: 'requested-trips',
  initialState: initialRequestedTripState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listRequestedTrips.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(listRequestedTrips.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.trips = action.payload;
      })
      .addCase(listRequestedTrips.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: 'Unknown error' };
        }
      });
  },
});

export const initialConfirmedTripState = {
  trips: null,
  status: 'idle',
  error: null,
} as TripList;

export const confirmedTripSlice = createSlice({
  name: 'confirmed-trips',
  initialState: initialConfirmedTripState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listConfirmedTrips.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(listConfirmedTrips.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.trips = action.payload;
      })
      .addCase(listConfirmedTrips.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: 'Unknown error' };
        }
      });
  },
});

export const initialBookingIdState = {
  bookingId: null,
  status: 'idle',
  error: null,
} as BookingIdType;

export const getBookingIdSlice = createSlice({
  name: 'booking-id',
  initialState: initialBookingIdState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findBookingId.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(findBookingId.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.bookingId = action.payload;
      })
      .addCase(findBookingId.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: 'Unknown error' };
        }
      });
  },
});

export const initialTripRequestListState = {
  requests: null,
  status: 'idle',
  error: null,
} as TripRequestState;

export const getAllTripRequestsSlice = createSlice({
  name: 'trips',
  initialState: initialTripRequestListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listTripRequests.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(listTripRequests.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.requests = action.payload;
      })
      .addCase(listTripRequests.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: 'Unknown error' };
        }
      });
  },
});

export const { resetStart } = startTripSlice.actions;
export const { resetEnd } = endTripSlice.actions;
export const { resetAccept } = acceptTripRequestSlice.actions;
export const { resetDecline } = declineTripRequestSlice.actions;
