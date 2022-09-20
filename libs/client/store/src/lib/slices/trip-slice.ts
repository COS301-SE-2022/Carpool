import { createSlice } from '@reduxjs/toolkit';
import {
  TripBooking,
  TripDetails,
  TripList,
  UpcomingTrip,
  AcceptTripRequest,
  StartTrip,
  EndTrip,
  UpdatePaymentStatusType,
  BookingIdType,
  DeclineTripRequest,
  CreateTripState,
  TripRequestState,
  DriverTripCancel,
  PassengerTripCancel,
} from '../types/trip-types';
import {
  createTrip,
  listTrips,
  fetchTripDetails,
  fetchUpcomingTrip,
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
  listUpcomingTrips,
  listTripRequests,
  cancelDriverTrip,
  cancelPassengerTrip,
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

export const tripUpcomingListSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listUpcomingTrips.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(listUpcomingTrips.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.trips = action.payload;
      })
      .addCase(listUpcomingTrips.rejected, (state, action) => {
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

export const tripUpcomingState = {
  trip: null,
  status: 'idle',
  error: null,
} as UpcomingTrip;

export const upcomingTripSlice = createSlice({
  name: 'upcoming',
  initialState: tripUpcomingState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingTrip.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(fetchUpcomingTrip.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.trip = action.payload;
      })
      .addCase(fetchUpcomingTrip.rejected, (state, action) => {
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

export const initialCancelDriverState = {
  tripId: '',
  status: 'idle',
  error: null,
} as DriverTripCancel;

export const cancelDriverTripSlice = createSlice({
  name: 'trips',
  initialState: initialCancelDriverState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cancelDriverTrip.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(cancelDriverTrip.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.tripId = action.payload;
      })
      .addCase(cancelDriverTrip.rejected, (state, action) => {
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

export const initialCancelPassengerState = {
  tripId: '',
  status: 'idle',
  error: null,
} as PassengerTripCancel;

export const cancelPassenegerTripSlice = createSlice({
  name: 'trips',
  initialState: initialCancelPassengerState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cancelPassengerTrip.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(cancelPassengerTrip.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.tripId = action.payload;
      })
      .addCase(cancelPassengerTrip.rejected, (state, action) => {
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
