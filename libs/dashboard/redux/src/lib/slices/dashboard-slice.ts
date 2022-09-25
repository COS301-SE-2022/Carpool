import { createSlice } from '@reduxjs/toolkit';
import { dashboardAnalytics } from '../actions/dashboard-actions';
import { DashboardState } from '../types/dashboard-types';

export const initialState = {
  analytics: null,
  status: 'idle',
  error: null,
} as DashboardState;

export const dashboardAnalyticsSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(dashboardAnalytics.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(dashboardAnalytics.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.analytics = action.payload;
      })
      .addCase(dashboardAnalytics.rejected, (state, action) => {
        console.log('FAIL');
        state.status = 'idle';
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: 'Unknown error' };
        }
      });
  },
});
