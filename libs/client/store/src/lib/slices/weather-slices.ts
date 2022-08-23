import { createSlice } from '@reduxjs/toolkit';
import { WeatherState } from '../types/weather-types';
import { getWeather } from '../actions/weather-actions';

export const initialState = {
  weather: null,
  status: 'idle',
  error: null,
} as WeatherState;

export const getWeatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state, action) => {
        console.log('IDLE');
        state.status = 'loading';
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        console.log('SUCCESS');
        state.status = 'success';
        state.weather = action.payload;
      })
      .addCase(getWeather.rejected, (state, action) => {
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
