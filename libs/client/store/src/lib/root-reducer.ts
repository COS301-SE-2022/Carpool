import { combineReducers } from 'redux';
import { userLoginSlice } from './slices/auth-slice';
import { tripListSlice, tripDetailsSlice } from './slices/trip-slice';

const RootReducer = combineReducers({
  user: userLoginSlice.reducer,
  trips: tripListSlice.reducer,
  trip: tripDetailsSlice.reducer,
});

export default RootReducer;
