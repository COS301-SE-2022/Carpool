import { Error } from './auth-types';

export type TripList = {
  trips: Trip[] | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type Trip = {
  tripId: string;
  driver: Driver;
  startLocation: string;
  destination: string;
  tripDate: string;
  price?: string;
  seatsAvailable?: string;
};

export type Driver = {
  name: string;
  surname: string;
  profilePic: string;
};

export type TripDetails = {
  trip: Trip | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};
