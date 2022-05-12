import { combineReducers } from 'redux';
import { userLoginSlice } from './slices/auth-slice';
import { tripListSlice } from './slices/trip-slice';

const RootReducer = combineReducers({
  user: userLoginSlice.reducer,
  trips: tripListSlice.reducer,
});

export default RootReducer;
