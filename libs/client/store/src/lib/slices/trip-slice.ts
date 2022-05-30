import { createSlice } from '@reduxjs/toolkit';
import { TripDetails, TripList, UpcomingTrip } from '../types/trip-types';
import {
  listTrips,
  fetchTripDetails,
  fetchUpcomingTrip,
} from '../actions/trip-actions';

export const initialState = {
  trips: null,
  status: 'idle',
  error: null,
} as TripList;

export const tripListSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listTrips.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(listTrips.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.trips = action.payload;
      })
      .addCase(listTrips.rejected, (state, action) => {
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

export const tripInitialState = {
  trip: null,
  status: 'idle',
  error: null,
} as TripDetails;

export const tripDetailsSlice = createSlice({
  name: 'trip',
  initialState: tripInitialState,
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

export const tripUpcomingState = {
  trip: null,
  status: 'idle',
  error: null,
} as UpcomingTrip;

export const upcomingTripSlice = createSlice({
  name: 'upcoming',
  initialState: tripUpcomingState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingTrip.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(fetchUpcomingTrip.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.trip = action.payload;
      })
      .addCase(fetchUpcomingTrip.rejected, (state, action) => {
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
