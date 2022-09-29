import { createSlice } from '@reduxjs/toolkit';
import {
  dashboardAnalytics,
  fetchUserProfile,
  listUsers,
  fetchUserTrips,
  fetchTripDetails,
  fetchAllTrips,
} from '../actions/dashboard-actions';
import {
  DashboardState,
  UserProfileState,
  UserListState,
  UserTripsState,
  TripDetailState,
  AllTripsState,
} from '../types/dashboard-types';

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

export const initialListState = {
  users: null,
  status: 'idle',
  error: null,
} as UserListState;

export const userListSlice = createSlice({
  name: 'users',
  initialState: initialListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listUsers.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.users = action.payload;
      })
      .addCase(listUsers.rejected, (state, action) => {
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

export const initialProfileState = {
  userProfile: null,
  status: 'idle',
  error: null,
} as UserProfileState;

export const userProfileSlice = createSlice({
  name: 'user',
  initialState: initialProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
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

export const initialTripsState = {
  trips: null,
  status: 'idle',
  error: null,
} as UserTripsState;

export const userTripsSlice = createSlice({
  name: 'userTrips',
  initialState: initialTripsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTrips.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(fetchUserTrips.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.trips = action.payload;
      })
      .addCase(fetchUserTrips.rejected, (state, action) => {
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

export const initialTripDetailsState = {
  trip: null,
  status: 'idle',
  error: null,
} as TripDetailState;

export const tripDetailsSlice = createSlice({
  name: 'tripDetails',
  initialState: initialTripDetailsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTripDetails.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(fetchTripDetails.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.trip = action.payload;
      })
      .addCase(fetchTripDetails.rejected, (state, action) => {
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

export const initialAllTripsState = {
  trips: null,
  status: 'idle',
  error: null,
} as AllTripsState;

export const allTripsSlice = createSlice({
  name: 'trips',
  initialState: initialAllTripsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTrips.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(fetchAllTrips.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.trips = action.payload;
      })
      .addCase(fetchAllTrips.rejected, (state, action) => {
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
