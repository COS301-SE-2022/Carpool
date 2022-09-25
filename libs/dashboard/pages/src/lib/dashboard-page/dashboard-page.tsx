import React from 'react';
import { Stack, Grid } from '@mui/material';
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
} from '@carpool/dashboard/components';

function createDataUsers(name: string, university: string, joined: string) {
  return { name, university, joined };
}

const rowsUsers = [
  createDataUsers('Ashleigh Govender', 'University of Pretoria', '2021-08-01'),
  createDataUsers('Benjamin Osmers', 'University of Pretoria', '2021-08-01'),
  createDataUsers('Jason Antalis', 'University of Pretoria', '2021-08-01'),
  createDataUsers('Wesley Pachai', 'University of Pretoria', '2021-08-01'),
  createDataUsers('Juliana Scheepers', 'University of Pretoria', '2021-08-01'),
];

export function DashboardPage() {
  return (
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
            value="100"
            title="September's Trips"
            icon={<DirectionsCarIcon sx={{ color: '#fff' }} fontSize="large" />}
          />
          <DashboardSmallCard
            value="100"
            title="September's Bookings"
            icon={<DirectionsRunIcon sx={{ color: '#fff' }} fontSize="large" />}
          />
          <DashboardSmallCard
            value="100"
            title="Total Users"
            icon={<GroupIcon sx={{ color: '#fff' }} fontSize="large" />}
          />
          <DashboardSmallCard
            value="100"
            title="Total Drivers"
            icon={
              <SportsMotorsportsIcon sx={{ color: '#fff' }} fontSize="large" />
            }
          />
        </Grid>
      </Stack>
      <Stack sx={{ flex: 8 }}>
        <Grid container sx={{ height: '100%', my: 2 }}>
          <DashboardGraph />
          <DashboardTopUsers title="Top Users" />
        </Grid>
      </Stack>
      <Stack sx={{ flex: 8 }}>
        <Grid container sx={{ height: '100%', my: 2, mb: 3 }}>
          <DashboardRecentUsers />
          <DashboardTopUsers title="Top Destinations" />
        </Grid>
      </Stack>
    </Stack>
  );
}

export default DashboardPage;
