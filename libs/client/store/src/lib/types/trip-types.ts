import { Error } from './auth-types';

export type TripList = {
  trips: Trip[] | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type Trip = {
  tripId: string;
  driver: string;
  startLocation: string;
  destination: string;
  created: string;
  image: string;
  date: string;
  distance: string;
};
