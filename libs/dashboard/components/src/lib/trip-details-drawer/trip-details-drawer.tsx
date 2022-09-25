import React, { useEffect, Fragment, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  RootStore,
  AppDispatch,
  fetchTripDetails,
} from '@carpool/dashboard/redux';
import { styled, useTheme } from '@mui/material/styles';
import {
  Drawer,
  Box,
  Divider,
  Stack,
  Typography,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  Avatar,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { formatDate } from '@carpool/client/shared/utilities';
import StarIcon from '@mui/icons-material/Star';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 0.5),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

type TripDetailsDrawerProps = {
  open: boolean;
  toggleDrawer: () => void;
  ID: string;
  handleDrawerClose: () => void;
};

export function TripDetailsDrawer({
  open,
  toggleDrawer,
  ID,
  handleDrawerClose,
}: TripDetailsDrawerProps) {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const tripDetailsState = useSelector((state: RootStore) => state.tripDetails);
  const { trip, error, status: tripDetailsStatus } = tripDetailsState;

  useEffect(() => {
    ID !== '' && dispatch(fetchTripDetails(ID));
  }, [ID, dispatch]);

  return (
    <Stack>
      {tripDetailsStatus === 'loading' ? (
        <Stack
          sx={{
            width: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <CircularProgress />
        </Stack>
      ) : (
        trip && (
          <Drawer anchor="right" open={open} onClose={toggleDrawer}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Box
              sx={{ width: 700, px: 3 }}
              role="presentation"
              onClick={toggleDrawer}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ pb: 3 }}
              >
                <Stack>
                  <Typography
                    sx={{ fontWeight: 'light', p: 0, m: 0 }}
                    gutterBottom
                    component="div"
                    fontSize={15}
                  >
                    Trip to
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'medium', p: 0, m: 0 }}
                    gutterBottom
                    component="div"
                  >
                    {trip.coordinates[1].address}
                  </Typography>
                </Stack>
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Stack sx={{ pb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'medium' }}
                  gutterBottom
                  component="div"
                >
                  Trip Details
                </Typography>
                <List
                  sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                  }}
                >
                  <ListItem alignItems="center">
                    <Typography sx={{ fontWeight: '600' }}>
                      From:{' '}
                      <span style={{ marginLeft: 1, fontWeight: '400' }}>
                        {trip.coordinates[0].address}
                      </span>
                    </Typography>
                  </ListItem>
                  <Divider component="li" />
                  <ListItem alignItems="center">
                    <Typography sx={{ fontWeight: '600' }}>
                      To:{' '}
                      <span style={{ marginLeft: 1, fontWeight: '400' }}>
                        {trip.coordinates[1].address}
                      </span>
                    </Typography>
                  </ListItem>
                  <Divider component="li" />
                  <ListItem alignItems="center">
                    <Typography sx={{ fontWeight: '600' }}>
                      Date:{' '}
                      <span style={{ marginLeft: 1, fontWeight: '400' }}>
                        {formatDate(trip.tripDate)}
                      </span>
                    </Typography>
                  </ListItem>
                  <Divider component="li" />
                  <ListItem alignItems="center">
                    <Typography sx={{ fontWeight: '600' }}>
                      Price per seat:{' '}
                      <span style={{ marginLeft: 1, fontWeight: '400' }}>
                        R{trip.price}.00
                      </span>
                    </Typography>
                  </ListItem>
                </List>
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Stack sx={{ pb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'medium' }}
                  gutterBottom
                  component="div"
                >
                  Driver Details
                </Typography>
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
                      width: 60,
                      borderRadius: '50%',
                      marginRight: 20,
                    }}
                  />
                  <Stack>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: '600', textAlign: 'left' }}
                    >
                      {trip.driver.name} {trip.driver.surname}
                    </Typography>
                    <Stack
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <StarIcon sx={{ fontSize: 20 }} />
                      <StarIcon sx={{ fontSize: 20 }} />
                      <StarIcon sx={{ fontSize: 20 }} />
                      <StarIcon sx={{ fontSize: 20 }} />
                      <StarIcon sx={{ fontSize: 20 }} />
                      <Typography sx={{ ml: 2 }}>5.0</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Stack sx={{ pb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'medium' }}
                  gutterBottom
                  component="div"
                >
                  Passengers
                </Typography>
                <List
                  sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                  }}
                >
                  {trip.passengers.map((passenger, index) => (
                    <Fragment key={index}>
                      <ListItem alignItems="center">
                        <ListItemAvatar>
                          <Avatar
                            alt={passenger.user.name}
                            src={require('./ben.png')}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${passenger.user.name} ${passenger.user.surname}`}
                          sx={{ fontWeight: '600' }}
                        />
                      </ListItem>
                      <Divider component="li" />
                    </Fragment>
                  ))}
                </List>
              </Stack>
            </Box>
          </Drawer>
        )
      )}
    </Stack>
  );
}

export default TripDetailsDrawer;
