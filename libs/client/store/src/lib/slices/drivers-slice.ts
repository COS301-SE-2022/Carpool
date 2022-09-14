import { createSlice } from '@reduxjs/toolkit';
import { DriverProfileState } from '../types/driver-types';
import { fetchDriverProfile } from '../actions/driver-actions';

export const initialProfileState = {
  driver: null,
  status: 'idle',
  error: null,
} as DriverProfileState;

export const driverProfileSlice = createSlice({
  name: 'drivers',
  initialState: initialProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDriverProfile.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(fetchDriverProfile.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.driver = action.payload;
      })
      .addCase(fetchDriverProfile.rejected, (state, action) => {
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
