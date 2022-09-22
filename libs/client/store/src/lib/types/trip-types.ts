import { Error } from './auth-types';

export type CreateTripState = {
  trip: string;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type TripCreateType = {
  tripId: string;
  driver: Driver;
  tripDate: string;
  createdAt: string;
  price: number;
  coordinates: Location[];
};

export type TripRequestType = {
  bookingId: string;
  user: User;
  trip: TripRequest;
};

export type TripRequestState = {
  requests: TripRequestType[] | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type TripRequest = {
  tripDate: string;
  tripId: string;
  coordinates: Location[];
};

export type User = {
  id: string;
  name: string;
  surname: string;
};

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
  price: string;
  status: string;
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
  status: string;
};

export type TripBooking = {
  tripId: string | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type AcceptTripRequest = {
  tripId: string | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type DeclineTripRequest = {
  bookingId: string | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type UpdatePaymentStatusType = {
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type BookingIdType = {
  bookingId: string | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};
export type StartTrip = {
  tripId: string | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type EndTrip = {
  tripId: string | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type ReviewType = {
  byId: string;
  forId: string;
  tripId: string;
  role: string;
  comment: string;
  rating: string;
};

export type ReviewTripState = {
  review: ReviewType | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type PassengerList = {
  passengers: PassengerListType[] | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type PassengerListType = {
 passengers: Passengers;
 user : User;
};

export type Passengers = {
  bookingId: string;
  tripId: Driver;
  userId: string;
};



