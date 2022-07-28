import { createTripSlice } from './trip-slice';
import { createTrip } from '../actions/trip-actions';
import { CreateTripState } from '../types/trip-types';

describe('CreateTripSlice', () => {
  describe('reducer', () => {
    const initialState = {
      trip: '',
      status: 'idle',
      error: null,
    } as CreateTripState;
  });
});
