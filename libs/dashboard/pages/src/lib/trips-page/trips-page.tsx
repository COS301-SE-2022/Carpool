import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Stack,
  Paper,
  CircularProgress,
  TableBody,
  Chip,
  Button,
  Typography,
} from '@mui/material';
import { formatDate } from '@carpool/client/shared/utilities';
import {
  RootStore,
  AppDispatch,
  fetchAllTrips,
} from '@carpool/dashboard/redux';
import {
  TripDetailsDrawer,
  DashboardTitle,
} from '@carpool/dashboard/components';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Helmet from 'react-helmet';

export function TripsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const allTripsState = useSelector((state: RootStore) => state.allTrips);
  const { status, error, trips } = allTripsState;

  const [open, setOpen] = useState(false);
  const [ID, setID] = useState('');

  useEffect(() => {
    if (!trips) {
      dispatch(fetchAllTrips());
    }
  }, [dispatch, trips]);

  const toggleDrawer = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Stack sx={{ width: '100%' }}>
        <Helmet>
          <title>Carpool | Trips</title>
        </Helmet>
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
          trips && (
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                width: '100%',
                backgroundColor: '#f2f2f2',
                px: 2,
              }}
            >
              <DashboardTitle title="Trips" />
              <Stack sx={{ flex: 10 }}>
                <Grid item xs={12} md={12} lg={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">#</TableCell>
                          <TableCell>Driver</TableCell>
                          <TableCell>Trip Date</TableCell>
                          <TableCell>Created</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Passengers</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell align="center">Reviewed</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {trips.map((trip, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              '&:last-child td, &:last-child th': {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {index + 1}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              <Stack
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}
                              >
                                <img
                                  src={require('./ben.png')}
                                  alt="user profile pic"
                                  style={{
                                    width: 35,
                                    borderRadius: '50%',
                                    marginRight: 20,
                                  }}
                                />
                                <Stack>
                                  <Typography
                                    variant="body1"
                                    sx={{ fontWeight: 600 }}
                                  >
                                    {trip.driver.name} {trip.driver.surname}
                                  </Typography>
                                </Stack>
                              </Stack>
                            </TableCell>
                            <TableCell>{formatDate(trip.tripDate)}</TableCell>
                            <TableCell>{formatDate(trip.createdAt)}</TableCell>
                            <TableCell>R{trip.price}</TableCell>
                            <TableCell>{trip.passengers.length}</TableCell>
                            <TableCell>
                              <Chip
                                label={trip.status}
                                variant="outlined"
                                sx={{
                                  borderColor: '#038C0C',
                                  color: '#038C0C',
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <CheckCircleIcon sx={{ color: '#038C0C' }} />
                            </TableCell>
                            <TableCell align="center">
                              <Button
                                variant="contained"
                                sx={{
                                  backgroundColor: '#188aed',
                                  borderRadius: 20,
                                }}
                                onClick={() => {
                                  setID(trip.tripId);
                                  toggleDrawer();
                                }}
                              >
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Stack>
            </Stack>
          )
        )}
      </Stack>
      <TripDetailsDrawer
        open={open}
        toggleDrawer={toggleDrawer}
        handleDrawerClose={handleDrawerClose}
        ID={ID}
      />
    </Fragment>
  );
}

export default TripsPage;
