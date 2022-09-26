import React, { useEffect, useState, Fragment } from 'react';
import {
  Stack,
  Grid,
  CircularProgress,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  Button,
  Chip,
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import {
  DashboardSmallCard,
  UserProfileContent,
  UserProfileHeader,
  TripDetailsDrawer,
} from '@carpool/dashboard/components';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootStore,
  AppDispatch,
  fetchUserProfile,
  fetchUserTrips,
} from '@carpool/dashboard/redux';
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '@carpool/client/shared/utilities';
import Helmet from 'react-helmet';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 10,
}));

export function UserProfile() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [ID, setID] = useState('');

  const toggleDrawer = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [view, setView] = useState('profile');

  const userProfileState = useSelector((state: RootStore) => state.userProfile);
  const { status, error, userProfile } = userProfileState;

  const userTripsState = useSelector((state: RootStore) => state.userTrips);
  const { status: tripsStatus, error: tripsError, trips } = userTripsState;

  useEffect(() => {
    id && dispatch(fetchUserProfile(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (view === 'driver') {
      id && dispatch(fetchUserTrips(id));
    }
  }, [dispatch, id, view]);

  return (
    <Fragment>
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
          userProfile && (
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
              <Helmet>
                <title>
                  {userProfile.name} {userProfile.surname}
                </title>
              </Helmet>
              <UserProfileHeader
                name={`${userProfile.name} ${userProfile.surname}`}
                email={userProfile.email}
                setView={setView}
                view={view}
                onBack={() => navigate(-1)}
              />
              <Stack sx={{ flex: 3 }}>
                <Grid container sx={{ height: '100%', mt: 2, mb: 2 }}>
                  <DashboardSmallCard
                    value="5.0"
                    title="Rating"
                    icon={
                      <ThumbUpIcon sx={{ color: '#fff' }} fontSize="large" />
                    }
                  />
                  <DashboardSmallCard
                    value="10"
                    title="Total Reviews"
                    icon={<StarIcon sx={{ color: '#fff' }} fontSize="large" />}
                  />
                  <DashboardSmallCard
                    value={`${userProfile.tripsCreated.length}`}
                    title="Trips Created"
                    icon={
                      <DirectionsCarIcon
                        sx={{ color: '#fff' }}
                        fontSize="large"
                      />
                    }
                  />
                  <DashboardSmallCard
                    value={`${userProfile.bookings.length}`}
                    title="Bookings Made"
                    icon={
                      <SportsMotorsportsIcon
                        sx={{ color: '#fff' }}
                        fontSize="large"
                      />
                    }
                  />
                </Grid>
              </Stack>
              <Stack sx={{ flex: 15 }}>
                <Grid container sx={{ height: '100%', my: 2, mb: 3 }}>
                  {tripsStatus === 'loading' ? (
                    <Stack
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                      }}
                    >
                      <CircularProgress />
                    </Stack>
                  ) : view === 'profile' ? (
                    <Grid item xs={12} md={12} lg={12}>
                      <Item
                        sx={{
                          height: '100%',
                          mx: 2,
                          px: 4,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-start',
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{ textAlign: 'left', pt: 1, pb: 2 }}
                        >
                          Details
                        </Typography>
                        <Grid container>
                          <Grid item xs={6}>
                            <UserProfileContent
                              title="_id"
                              value={userProfile.id}
                            />
                            <UserProfileContent
                              title="name"
                              value={`${userProfile.name} ${userProfile.surname}`}
                            />
                            <UserProfileContent
                              title="email"
                              value={userProfile.email}
                            />
                            <UserProfileContent
                              title="university"
                              value={userProfile.university}
                            />
                            <UserProfileContent
                              title="student number"
                              value={userProfile.studentNumber}
                            />
                            <UserProfileContent
                              title="cellphone"
                              value={userProfile.cellNumber}
                            />
                            <UserProfileContent
                              title="isDriver"
                              icon={
                                userProfile.isDriver ? (
                                  <CheckCircleIcon sx={{ color: '#038C0C' }} />
                                ) : (
                                  <CancelIcon sx={{ color: '#C00' }} />
                                )
                              }
                            />
                            <UserProfileContent
                              title="joined"
                              value={formatDate(userProfile.createdAt)}
                            />
                          </Grid>
                          {userProfile.driver && (
                            <Grid item xs={6}>
                              <UserProfileContent
                                title="id number"
                                value={userProfile.driver.idNumber}
                              />
                              <UserProfileContent
                                title="license plate"
                                value={userProfile.driver.licensePlate}
                              />
                              <UserProfileContent
                                title="vehicle"
                                value={userProfile.driver.model}
                              />
                            </Grid>
                          )}
                        </Grid>
                      </Item>
                    </Grid>
                  ) : view === 'driver' ? (
                    trips && (
                      <Grid item xs={12} md={12} lg={12}>
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 650 }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">#</TableCell>
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
                                  <TableCell>
                                    {formatDate(trip.tripDate)}
                                  </TableCell>
                                  <TableCell>
                                    {formatDate(trip.createdAt)}
                                  </TableCell>
                                  <TableCell>R{trip.price}</TableCell>
                                  <TableCell>
                                    {trip.passengers.length}
                                  </TableCell>
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
                                    <CheckCircleIcon
                                      sx={{ color: '#038C0C' }}
                                    />
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
                    )
                  ) : (
                    view === 'passenger' && (
                      <Grid item xs={12} md={12} lg={12}>
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 650 }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">#</TableCell>
                                <TableCell>Driver</TableCell>
                                <TableCell>Trip Date</TableCell>
                                <TableCell>Booked</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="center">Reviewed</TableCell>
                                <TableCell align="center">Actions</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow
                                sx={{
                                  '&:last-child td, &:last-child th': {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  1
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
                                        Benjamin Osmers
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        sx={{ color: '#9e9e9e' }}
                                      >
                                        u16068344@tuks.co.za
                                      </Typography>
                                    </Stack>
                                  </Stack>
                                </TableCell>
                                <TableCell>
                                  {formatDate(`${new Date()}`)}
                                </TableCell>
                                <TableCell>
                                  {formatDate(`${new Date()}`)}
                                </TableCell>
                                <TableCell>R30.00</TableCell>
                                <TableCell>
                                  <Chip
                                    label="paid"
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
                                    onClick={() => navigate(`/users`)}
                                  >
                                    Details
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    )
                  )}
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

export default UserProfile;
