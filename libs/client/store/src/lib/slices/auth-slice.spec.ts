import { userProfileSlice } from './auth-slice';
import { fetchUserProfile } from '../actions/auth-actions';
import { UserProfileState } from '../types/auth-types';

describe('userProfileSlice', () => {
  describe('reducers', () => {
    const initialState = {
      userProfile: null,
      status: 'idle',
      error: null,
    } as UserProfileState;

    it('sets loading to loading when fetchUserProfile is pending', () => {
      const action = { type: fetchUserProfile.pending.type };
      const state = userProfileSlice.reducer(initialState, action);
      expect(state).toEqual({ user: null, loading: 'loading', error: null });
    });

    it('sets the user and sets loading to success when fetchUserProfile is fulfilled', () => {
      const action = {
        type: fetchUserProfile.fulfilled.type,
        payload: { name: 'John', currentHeight: '178', avg: 151.28 },
      };
      const state = userProfileSlice.reducer(initialState, action);
      expect(state).toEqual({
        user: { name: 'John', currentHeight: '178', avg: 151.28 },
        loading: 'success',
        error: null,
      });
    });

    it('sets loading to error when fetchUserProfile is rejected', () => {
      const action = {
        type: fetchUserProfile.rejected.type,
        payload: undefined,
      };
      const state = userProfileSlice.reducer(initialState, action);
      expect(state).toEqual({
        user: null,
        loading: 'error',
        error: undefined,
      });
    });
  });
});
