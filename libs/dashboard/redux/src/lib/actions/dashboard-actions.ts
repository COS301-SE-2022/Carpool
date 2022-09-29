import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  DashboardAnalytics,
  UserProfile,
  Trip,
  User,
  TripDetails,
} from '../types/dashboard-types';
import {
  TRIPS_FOR_MONTH,
  BOOKINGS_FOR_MONTH,
  TOTAL_USERS,
  TOTAL_DRIVERS,
  RECENT_USERS,
  TRIPS_BY_MONTH,
  TOP_UNIVERSITIES,
  GET_USER_PROFILE,
  GET_DRIVER_PROFILE,
  LIST_USERS,
  USER_TRIPS,
  TRIP_DETAILS,
  GET_ALL_TRIPS,
  TOP_USERS,
} from '../queries/dashboard-queries';

export const dashboardAnalytics = createAsyncThunk<
  DashboardAnalytics,
  void,
  { rejectValue: Error }
>('dashboard/analytics', async (__, thunkApi) => {
  //* TRIPS FOR MONTH
  const tripsForMonth = await axios.post(
    `https://carpoolcos301.herokuapp.com/graphql`,
    {
      query: TRIPS_FOR_MONTH,
    }
  );

  if (tripsForMonth.data.errors) {
    const error = {
      message: tripsForMonth.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  //* BOOKINGS FOR MONTH
  const bookingsForMonth = await axios.post(
    `https://carpoolcos301.herokuapp.com/graphql`,
    {
      query: BOOKINGS_FOR_MONTH,
    }
  );

  //* TOTAL USERS
  const totalUsers = await axios.post(
    `https://carpoolcos301.herokuapp.com/graphql`,
    {
      query: TOTAL_USERS,
    }
  );

  //* TOTAL DRIVERS
  const totalDrivers = await axios.post(
    `https://carpoolcos301.herokuapp.com/graphql`,
    {
      query: TOTAL_DRIVERS,
    }
  );

  //* RECENT USERS
  const recentUsers = await axios.post(
    `https://carpoolcos301.herokuapp.com/graphql`,
    {
      query: RECENT_USERS,
    }
  );

  //* TRIPS FOR YEAR GROUPED BY MONTH
  const tripsForYear = await axios.post(
    `https://carpoolcos301.herokuapp.com/graphql`,
    {
      query: TRIPS_BY_MONTH,
    }
  );

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
  const topUniversities = await axios.post(
    `https://carpoolcos301.herokuapp.com/graphql`,
    {
      query: TOP_UNIVERSITIES,
    }
  );

  //* TOP USERS
  const topUsers = await axios.post(
    `https://carpoolcos301.herokuapp.com/graphql`,
    {
      query: TOP_USERS,
    }
  );

  const analytics = {
    tripsForMonth: tripsForMonth.data.data.findTripsForMonth,
    bookingsForMonth: bookingsForMonth.data.data.findBookingsForMonth,
    totalUsers: totalUsers.data.data.findTotalUsers,
    totalDrivers: totalDrivers.data.data.findTotalDrivers,
    recentUsers: recentUsers.data.data.findRecentUsers,
    tripsForYear: res,
    topUsers: topUsers.data.data.findTopUsers,
    topUniversities: topUniversities.data.data.findTopUniversities,
  };

  return analytics;
});

export const listUsers = createAsyncThunk<User[], void, { rejectValue: Error }>(
  'users/list',
  async (__, thunkApi) => {
    //* USER PROFILE
    const userList = await axios.post(
      `https://carpoolcos301.herokuapp.com/graphql`,
      {
        query: LIST_USERS,
      }
    );

    if (userList.data.errors) {
      const error = {
        message: userList.data.errors[0].message,
      } as Error;

      return thunkApi.rejectWithValue(error);
    }

    return userList.data.data.findAllUsers;
  }
);

export const fetchUserProfile = createAsyncThunk<
  UserProfile,
  string,
  { rejectValue: Error }
>('user/profile', async (id: string, thunkApi) => {
  //* USER PROFILE
  const userProfile = await axios.post(
    `https://carpoolcos301.herokuapp.com/graphql`,
    {
      query: GET_USER_PROFILE,
      variables: {
        id,
      },
    }
  );

  if (userProfile.data.errors) {
    const error = {
      message: userProfile.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  if (userProfile.data.data.findUserById.isDriver) {
    const driverProfile = await axios.post(
      `https://carpoolcos301.herokuapp.com/graphql`,
      {
        query: GET_DRIVER_PROFILE,
        variables: {
          id,
        },
      }
    );

    return {
      ...userProfile.data.data.findUserById,
      driver: {
        ...driverProfile.data.data.findDriverProfile,
      },
    };
  } else {
    return userProfile.data.data.findUserById;
  }
});

export const fetchUserTrips = createAsyncThunk<
  Trip[],
  string,
  { rejectValue: Error }
>('userTrips/list', async (id: string, thunkApi) => {
  //* USER TRIPS
  const userTrips = await axios.post(
    `https://carpoolcos301.herokuapp.com/graphql`,
    {
      query: USER_TRIPS,
      variables: {
        id,
      },
    }
  );

  if (userTrips.data.errors) {
    const error = {
      message: userTrips.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  return userTrips.data.data.findByDriver;
});

export const fetchTripDetails = createAsyncThunk<
  TripDetails,
  string,
  { rejectValue: Error }
>('tripDetails/details', async (id: string, thunkApi) => {
  //* USER TRIPS
  const tripDetails = await axios.post(
    `https://carpoolcos301.herokuapp.com/graphql`,
    {
      query: TRIP_DETAILS,
      variables: {
        id,
      },
    }
  );

  if (tripDetails.data.errors) {
    const error = {
      message: tripDetails.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  return tripDetails.data.data.findTripById;
});

export const fetchAllTrips = createAsyncThunk<
  TripDetails[],
  void,
  { rejectValue: Error }
>('trips/all', async (__, thunkApi) => {
  //* USER TRIPS
  const allTrips = await axios.post(
    `https://carpoolcos301.herokuapp.com/graphql`,
    {
      query: GET_ALL_TRIPS,
    }
  );

  if (allTrips.data.errors) {
    const error = {
      message: allTrips.data.errors[0].message,
    } as Error;

    return thunkApi.rejectWithValue(error);
  }

  return allTrips.data.data.findAllTrips;
});
