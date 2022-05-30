import { combineReducers } from 'redux';
import { userLoginSlice } from './slices/auth-slice';
import {
  tripListSlice,
  tripDetailsSlice,
  upcomingTripSlice,
} from './slices/trip-slice';

const RootReducer = combineReducers({
  user: userLoginSlice.reducer,
  trips: tripListSlice.reducer,
  trip: tripDetailsSlice.reducer,
  upcoming: upcomingTripSlice.reducer,
});

export default RootReducer;
