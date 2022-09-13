import { combineReducers } from 'redux';
import { userLoginSlice } from './slices/auth-slices';

const RootReducer = combineReducers({
  user: userLoginSlice.reducer,
});

export default RootReducer;
