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
  NotificationState,
  BookingRequestState,
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
  listNotifications,
  deleteMessageNotifications,
  deleteBookingRequestNotification,
  findBookingRequest,
  deleteBookingAcceptedNotification,
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
  name: 'tripCreate',
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

export const initialNotificationState = {
  notifications: null,
  status: 'idle',
  error: null,
} as NotificationState;

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: initialNotificationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listNotifications.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(listNotifications.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.notifications = action.payload;
      })
      .addCase(listNotifications.rejected, (state, action) => {
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

export const initialDeleteMessageNotificationState = {
  notifications: null,
  status: 'idle',
  error: null,
} as NotificationState;

export const deleteMessageNotificationsSlice = createSlice({
  name: 'messageNotifications',
  initialState: initialDeleteMessageNotificationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteMessageNotifications.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(deleteMessageNotifications.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.notifications = action.payload;
      })
      .addCase(deleteMessageNotifications.rejected, (state, action) => {
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

export const initialDeleteBookingRequestNotificationState = {
  notifications: null,
  status: 'idle',
  error: null,
} as NotificationState;

export const deleteBookingRequestNotificationSlice = createSlice({
  name: 'bookingRequestNotifications',
  initialState: initialDeleteBookingRequestNotificationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteBookingRequestNotification.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(deleteBookingRequestNotification.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.notifications = action.payload;
      })
      .addCase(deleteBookingRequestNotification.rejected, (state, action) => {
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

export const initialDeleteBookingAcceptedNotificationState = {
  notifications: null,
  status: 'idle',
  error: null,
} as NotificationState;

export const deleteBookingAcceptedNotificationSlice = createSlice({
  name: 'bookingAcceptedNotifications',
  initialState: initialDeleteBookingAcceptedNotificationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteBookingAcceptedNotification.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(deleteBookingAcceptedNotification.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.notifications = action.payload;
      })
      .addCase(deleteBookingAcceptedNotification.rejected, (state, action) => {
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
  name: 'tripsDriver',
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
  name: 'passengerReviews',
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
  name: 'listPassengers',
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
        state.passengers = action.payload;
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
  name: 'driverReviews',
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
  name: 'tripSearch',
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
  name: 'passengerHistory',
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
  name: 'tripDetails',
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

export const bookingRequestInitialState = {
  request: null,
  status: 'idle',
  error: null,
} as BookingRequestState;

export const bookingRequestSlice = createSlice({
  name: 'bookingRequest',
  initialState: bookingRequestInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findBookingRequest.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(findBookingRequest.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.request = action.payload;
      })
      .addCase(findBookingRequest.rejected, (state, action) => {
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
  name: 'tripBook',
  initialState: tripBookingState,
  reducers: {
    resetBookTrip: () => tripBookingState,
  },
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
  name: 'acceptRequest',
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
  name: 'declineRequest',
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
  name: 'startTrip',
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
  name: 'endTrip',
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
  name: 'updatePaymentStatus',
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
  name: 'updatePassengerReviews',
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
  name: 'updateDriverReviews',
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
  name: 'requestedTrips',
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
  name: 'confirmedTrips',
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
  name: 'findBooking',
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
  name: 'tripRequests',
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
export const { resetBookTrip } = tripBookingSlice.actions;
