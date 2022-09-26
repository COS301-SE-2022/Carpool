import React, { useEffect } from 'react';
import { Stack, Grid, CircularProgress } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import GroupIcon from '@mui/icons-material/Group';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import {
  DashboardSmallCard,
  DashboardTitle,
  DashboardTopUsers,
  DashboardGraph,
  DashboardRecentUsers,
  DashboardTopUniversities,
} from '@carpool/dashboard/components';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootStore,
  AppDispatch,
  dashboardAnalytics,
} from '@carpool/dashboard/redux';
import { getMonthName } from '@carpool/client/shared/utilities';

export function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();

  const dashboardState = useSelector((state: RootStore) => state.dashboard);
  const { status, error, analytics } = dashboardState;

  useEffect(() => {
    if (!analytics) {
      dispatch(dashboardAnalytics());
    }
  }, [dispatch, analytics]);

  return (
    <Stack sx={{ width: '100%' }}>
      {status === 'loading' ? (
        <Stack
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '80vw',
          }}
        >
          <CircularProgress />
        </Stack>
      ) : (
        analytics && (
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
              width: '100%',
              backgroundColor: '#f2f2f2',
              px: 2,
            }}
          >
            <DashboardTitle title="Dashboard" />
            <Stack sx={{ flex: 3 }}>
              <Grid container sx={{ height: '100%', mt: 2, mb: 2 }}>
                <DashboardSmallCard
                  value={`${analytics.tripsForMonth}`}
                  title={`${getMonthName(new Date().toISOString())}'s Trips`}
                  icon={
                    <DirectionsCarIcon
                      sx={{ color: '#fff' }}
                      fontSize="large"
                    />
                  }
                />
                <DashboardSmallCard
                  value={`${analytics.bookingsForMonth}`}
                  title={`${getMonthName(new Date().toISOString())}'s Bookings`}
                  icon={
                    <DirectionsRunIcon
                      sx={{ color: '#fff' }}
                      fontSize="large"
                    />
                  }
                />
                <DashboardSmallCard
                  value={`${analytics.totalUsers}`}
                  title="Total Users"
                  icon={<GroupIcon sx={{ color: '#fff' }} fontSize="large" />}
                />
                <DashboardSmallCard
                  value={`${analytics.totalDrivers}`}
                  title="Total Drivers"
                  icon={
                    <SportsMotorsportsIcon
                      sx={{ color: '#fff' }}
                      fontSize="large"
                    />
                  }
                />
              </Grid>
            </Stack>
            <Stack sx={{ flex: 8 }}>
              <Grid container sx={{ height: '100%', my: 2 }}>
                <DashboardGraph data={analytics.tripsForYear} />
                <DashboardTopUsers
                  title="Top Users"
                  data={analytics.topUsers}
                />
              </Grid>
            </Stack>
            <Stack sx={{ flex: 8 }}>
              <Grid container sx={{ height: '100%', my: 2, mb: 3 }}>
                <DashboardRecentUsers data={analytics.recentUsers} />
                <DashboardTopUniversities
                  title="Top Universities"
                  data={analytics.topUniversities}
                />
              </Grid>
            </Stack>
          </Stack>
        )
      )}
    </Stack>
  );
}

export default DashboardPage;
