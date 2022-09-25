import { Error } from '@carpool/client/store';

export type DashboardState = {
  analytics: DashboardAnalytics | null;
  status: 'idle' | 'loading' | 'failed' | 'success';
  error: Error | null;
};

export type DashboardAnalytics = {
  tripsForMonth: number;
  bookingsForMonth: number;
  totalUsers: number;
  totalDrivers: number;
  // topUsers: TopUser[];
  recentUsers: RecentUser[];
  tripsForYear: TripsForYear[];
  topUniversities: TopUniversities[];
};

export type TopUser = {
  name: string;
  surname: string;
  rating: number;
};

export type RecentUser = {
  profilePic: string;
  name: string;
  surname: string;
  university: string;
  createdAt: string;
};

export type TripsForYear = {
  month: string;
  trips: number;
};

export type TopUniversities = {
  university: string;
  _count: {
    university: number;
  };
};

export type UserListState = {
  users: User[] | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  university: string;
  studentNumber: string;
  cellNumber: string;
  isDriver: boolean;
  createdAt: string;
};

export type UserProfileState = {
  userProfile: UserProfile | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type UserProfile = {
  id: string;
  name: string;
  surname: string;
  email: string;
  university: string;
  studentNumber: string;
  cellNumber: string;
  isDriver: boolean;
  createdAt: string;
  driver?: Driver;
  tripsCreated: TripCreated[];
  bookings: Booking[];
};

export type Driver = {
  licensePlate: string;
  model: string;
  idNumber: string;
};

export type TripCreated = {
  tripId: string;
};

export type Booking = {
  bookingId: string;
};

export type UserTripsState = {
  trips: Trip[] | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type Trip = {
  tripId: string;
  tripDate: string;
  createdAt: string;
  price: string;
  status: string;
  passengers: Passenger[];
};

export type Passenger = {
  bookingId: string;
};

export type TripDetailState = {
  trip: TripDetails | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};

export type TripDetails = {
  tripId: string;
  tripDate: string;
  createdAt: string;
  price: string;
  status: string;
  driver: DriverTripDetails;
  passengers: PassengerDetails[];
  coordinates: Coordinates[];
};

export type DriverTripDetails = {
  name: string;
  surname: string;
  profilePic: string;
};

export type PassengerDetails = {
  bookingId: string;
  user: DriverTripDetails;
};

export type Coordinates = {
  address: string;
  longitude: string;
  latitude: string;
};

export type AllTripsState = {
  trips: TripDetails[] | null;
  status: 'success' | 'loading' | 'error' | 'idle';
  error: Error | null;
};
