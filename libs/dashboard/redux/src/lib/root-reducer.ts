import { combineReducers } from 'redux';
import { userLoginSlice } from './slices/auth-slices';
import {
  dashboardAnalyticsSlice,
  userProfileSlice,
  userListSlice,
  userTripsSlice,
  tripDetailsSlice,
  allTripsSlice,
} from './slices/dashboard-slice';

const RootReducer = combineReducers({
  user: userLoginSlice.reducer,
  dashboard: dashboardAnalyticsSlice.reducer,
  userList: userListSlice.reducer,
  userProfile: userProfileSlice.reducer,
  userTrips: userTripsSlice.reducer,
  tripDetails: tripDetailsSlice.reducer,
  allTrips: allTripsSlice.reducer,
});

export default RootReducer;
