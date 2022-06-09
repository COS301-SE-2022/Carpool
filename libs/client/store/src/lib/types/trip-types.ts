import { Error } from './auth-types';

export type UpcomingTrip = {
  trip: TripUpcomingType | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type TripUpcomingType = {
  tripId: string;
  tripDate: string;
  coordinates: Location[];
};

export type TripList = {
  trips: TripListType[] | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type TripListType = {
  tripId: string;
  driver: Driver;
  tripDate: string;
  createdAt: string;
  coordinates: Location[];
};

export type Location = {
  address: string;
  latitude: string;
  longitude: string;
};

export type Passenger = {
  bookingId: string;
};

export type Driver = {
  id: string;
  name: string;
  surname: string;
  profilePic: string;
};

export type TripDetails = {
  trip: TripDetailsType | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type TripDetailsType = {
  tripId: string;
  driver: Driver;
  tripDate: string;
  createdAt: string;
  seatsAvailable?: string;
  price: string;
  coordinates: Location[];
};

export type TripBooking = {
  tripId: string | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};
