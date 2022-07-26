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
  passengerHistorySlice,
  createTripSlice,
  searchResultsSlice,
  tripBookingSlice,
  confirmedTripSlice,
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
  confirmedTrip: confirmedTripSlice.reducer,
});

export default RootReducer;
