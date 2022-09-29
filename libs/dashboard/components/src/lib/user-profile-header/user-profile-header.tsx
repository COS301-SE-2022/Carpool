import React from 'react';
import {
  Stack,
  Grid,
  Paper,
  IconButton,
  Button,
  Typography,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 10,
}));

type UserProfileHeaderProps = {
  name: string;
  email: string;
  view: string;
  profilePic: string;
  setView: (view: string) => void;
  onBack: () => void;
};

export function UserProfileHeader({
  name,
  email,
  onBack,
  view,
  profilePic,
  setView,
}: UserProfileHeaderProps) {
  return (
    <Stack sx={{ flex: 3 }}>
      <Grid container sx={{ height: '100%', mt: 2, mb: 2 }}>
        <Grid item xs={12} md={12} lg={12}>
          <Item
            sx={{
              height: '100%',
              mx: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Grid container sx={{ px: 2 }}>
              <Grid item xs={8}>
                <Stack
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <Stack sx={{ mr: 5 }}>
                    <IconButton onClick={onBack}>
                      <ArrowBackIcon />
                    </IconButton>
                  </Stack>
                  <Stack
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    {/* <img
                      src={
                        profilePic !== ''
                          ? profilePic
                          : require('./placeholder.png')
                      }
                      alt="user profile pic"
                      style={{
                        width: 60,
                        borderRadius: '50%',
                        marginRight: 20,
                      }}
                    /> */}
                    <Avatar
                      alt={name}
                      src={
                        profilePic !== ''
                          ? profilePic
                          : require('./placeholder.png')
                      }
                      sx={{ width: 60, height: 60, marginRight: 2 }}
                    />
                    <Stack>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: '600', textAlign: 'left' }}
                      >
                        {name}
                      </Typography>
                      <Typography
                        sx={{
                          textAlign: 'left',
                          color: '#999',
                        }}
                      >
                        {email}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  onClick={() => setView('profile')}
                  variant={view === 'profile' ? 'contained' : 'outlined'}
                  sx={{
                    borderColor: view === 'profile' ? '#188aed' : '',
                    backgroundColor: view === 'profile' ? '#188aed' : '',
                    mx: 1,
                  }}
                >
                  Profile
                </Button>
                <Button
                  onClick={() => setView('driver')}
                  variant={view === 'driver' ? 'contained' : 'outlined'}
                  sx={{
                    borderColor: view === 'driver' ? '#188aed' : '',
                    backgroundColor: view === 'driver' ? '#188aed' : '',
                    mx: 1,
                  }}
                >
                  Driver
                </Button>
                <Button
                  onClick={() => setView('passenger')}
                  variant={view === 'passenger' ? 'contained' : 'outlined'}
                  sx={{
                    borderColor: view === 'passenger' ? '#188aed' : '',
                    backgroundColor: view === 'passenger' ? '#188aed' : '',
                    mx: 1,
                  }}
                >
                  Passenger
                </Button>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default UserProfileHeader;
