import { combineReducers } from 'redux';
import { userLoginSlice } from './slices/auth-slice';

const RootReducer = combineReducers({
  user: userLoginSlice.reducer,
});

export default RootReducer;
