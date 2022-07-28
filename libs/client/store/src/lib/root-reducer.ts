import { combineReducers } from 'redux';
import {
  userLoginSlice,
  userProfileSlice,
  userUpdateSlice,
} from './slices/auth-slice';
import {
  tripListSlice,
  tripDetailsSlice,
  upcomingTripSlice,
  driverHistorySlice,
  tripUpcomingListSlice,
  passengerHistorySlice,
  createTripSlice,
  searchResultsSlice,
  tripBookingSlice,
  acceptTripRequestSlice,
  startTripSlice,
  endTripSlice,
  confirmedTripSlice,
  requestedTripSlice,
  PaymentStatusUpdateSlice,
  getBookingIdSlice,
  declineTripRequestSlice,
  getAllTripRequestsSlice,
} from './slices/trip-slice';

const RootReducer = combineReducers({
  user: userLoginSlice.reducer,
  userProfile: userProfileSlice.reducer,
  updateUser: userUpdateSlice.reducer,
  trips: tripListSlice.reducer,
  driverHistory: driverHistorySlice.reducer,
  passengerHistory: passengerHistorySlice.reducer,
  searchResults: searchResultsSlice.reducer,
  trip: tripDetailsSlice.reducer,
  upcoming: upcomingTripSlice.reducer,
  createdTrip: createTripSlice.reducer,
  booking: tripBookingSlice.reducer,
  acceptTrip: acceptTripRequestSlice.reducer,
  declineTrip: declineTripRequestSlice.reducer,
  startTrip: startTripSlice.reducer,
  endTrip: endTripSlice.reducer,
  confirmedTrip: confirmedTripSlice.reducer,
  requestedTrip: requestedTripSlice.reducer,
  updatePaymentStatus: PaymentStatusUpdateSlice.reducer,
  bookingId: getBookingIdSlice.reducer,
  upcomingTrips: tripUpcomingListSlice.reducer,
  tripRequests: getAllTripRequestsSlice.reducer,
});

export default RootReducer;
