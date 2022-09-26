import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  CssBaseline,
  Box,
  Paper,
  Button,
  TextField,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore, AppDispatch, login } from '@carpool/dashboard/redux';
import { useNavigate } from 'react-router-dom';
import Helmet from 'react-helmet';

export function LoginPage() {
  const theme = createTheme();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userState = useSelector((state: RootStore) => state.user);
  const { user } = userState;

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    dispatch(
      login({
        email: data.get('email') as string,
        password: data.get('password') as string,
      })
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>Carpool | Login</title>
      </Helmet>
      <Grid
        container
        component="main"
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          component={Paper}
          sx={{ height: '100%', display: 'flex' }}
          elevation={0}
          square
        >
          <Box
            sx={{
              mx: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              style={{ textAlign: 'left', width: '100%', fontWeight: '700' }}
            >
              Welcome Back
            </Typography>
            <Typography
              component="p"
              style={{
                textAlign: 'left',
                width: '100%',
                paddingTop: '0.5rem',
                color: '#999',
              }}
            >
              Please sign in to your account to continue
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: 'url(./splash_screen.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <img
            src={require('./splash_screen.png')}
            alt="Splash screen"
            style={{ height: '100vh' }}
          ></img>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default LoginPage;
