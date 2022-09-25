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
