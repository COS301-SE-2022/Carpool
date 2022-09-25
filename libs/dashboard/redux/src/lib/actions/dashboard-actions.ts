import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { DashboardAnalytics } from '../types/dashboard-types';
import {
  TRIPS_FOR_MONTH,
  BOOKINGS_FOR_MONTH,
  TOTAL_USERS,
  TOTAL_DRIVERS,
  RECENT_USERS,
  TRIPS_BY_MONTH,
  TOP_UNIVERSITIES,
} from '../queries/dashboard-queries';

export const dashboardAnalytics = createAsyncThunk<
  DashboardAnalytics,
  void,
  { rejectValue: Error }
>('dashboard/analytics', async (__, thunkApi) => {
  //* TRIPS FOR MONTH
  const tripsForMonth = await axios.post(`http://localhost:3333/graphql`, {
    query: TRIPS_FOR_MONTH,
  });

  if (tripsForMonth.data.errors) {
    const error = {
      message: tripsForMonth.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  //* BOOKINGS FOR MONTH
  const bookingsForMonth = await axios.post(`http://localhost:3333/graphql`, {
    query: BOOKINGS_FOR_MONTH,
  });

  //* TOTAL USERS
  const totalUsers = await axios.post(`http://localhost:3333/graphql`, {
    query: TOTAL_USERS,
  });

  //* TOTAL DRIVERS
  const totalDrivers = await axios.post(`http://localhost:3333/graphql`, {
    query: TOTAL_DRIVERS,
  });

  //* RECENT USERS
  const recentUsers = await axios.post(`http://localhost:3333/graphql`, {
    query: RECENT_USERS,
  });

  //* TRIPS FOR YEAR GROUPED BY MONTH
  const tripsForYear = await axios.post(`http://localhost:3333/graphql`, {
    query: TRIPS_BY_MONTH,
  });

  const graphData = [
    { month: 'Jan', trips: 0 },
    { month: 'Feb', trips: 0 },
    { month: 'Mar', trips: 0 },
    { month: 'Apr', trips: 0 },
    { month: 'May', trips: 0 },
    { month: 'Jun', trips: 0 },
    { month: 'Jul', trips: 0 },
    { month: 'Aug', trips: 0 },
    { month: 'Sep', trips: 0 },
    { month: 'Oct', trips: 0 },
    { month: 'Nov', trips: 0 },
    { month: 'Dec', trips: 0 },
  ];

  const tripsData = tripsForYear.data.data.findTripsByMonth;

  const res = graphData.map((a: { month: string; trips: number }) => {
    const exists = tripsData.find(
      (b: { month: string; trips: number }) => a.month === b.month
    );

    if (exists) {
      a.trips = exists.trips;
    }

    return a;
  });

  //* TOP UNIVERSITIES
  const topUniversities = await axios.post(`http://localhost:3333/graphql`, {
    query: TOP_UNIVERSITIES,
  });

  const analytics = {
    tripsForMonth: tripsForMonth.data.data.findTripsForMonth,
    bookingsForMonth: bookingsForMonth.data.data.findBookingsForMonth,
    totalUsers: totalUsers.data.data.findTotalUsers,
    totalDrivers: totalDrivers.data.data.findTotalDrivers,
    recentUsers: recentUsers.data.data.findRecentUsers,
    tripsForYear: res,
    topUniversities: topUniversities.data.data.findTopUniversities,
  };

  return analytics;

  //* TOP USERS
});
