import { combineReducers } from 'redux';
import { userLoginSlice } from './slices/auth-slices';
import { dashboardAnalyticsSlice } from './slices/dashboard-slice';

const RootReducer = combineReducers({
  user: userLoginSlice.reducer,
  dashboard: dashboardAnalyticsSlice.reducer,
});

export default RootReducer;
