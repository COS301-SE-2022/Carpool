import { combineReducers } from 'redux';
import {
  userLoginSlice,
  userProfileSlice,
  userUpdateSlice,
  driverRegisterSlice,
} from './slices/auth-slice';
import {
  tripListSlice,
  tripDetailsSlice,
  driverHistorySlice,
  tripUpcomingSlice,
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
import { getWeatherSlice } from './slices/weather-slices';
import {
  getMessagesSlice,
  sendMessageSlice,
  getChatsSlice,
} from './slices/message-slices';
import { driverProfileSlice } from './slices/drivers-slice';

const RootReducer = combineReducers({
  user: userLoginSlice.reducer,
  userProfile: userProfileSlice.reducer,
  updateUser: userUpdateSlice.reducer,
  trips: tripListSlice.reducer,
  driverHistory: driverHistorySlice.reducer,
  passengerHistory: passengerHistorySlice.reducer,
  searchResults: searchResultsSlice.reducer,
  trip: tripDetailsSlice.reducer,
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
  upcomingTrip: tripUpcomingSlice.reducer,
  tripRequests: getAllTripRequestsSlice.reducer,
  weather: getWeatherSlice.reducer,
  driver: driverRegisterSlice.reducer,
  messages: getMessagesSlice.reducer,
  message: sendMessageSlice.reducer,
  chats: getChatsSlice.reducer,
  driverProfile: driverProfileSlice.reducer,
});

export default RootReducer;
