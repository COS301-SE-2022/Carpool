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
import { useSelector } from 'react-redux';
import { RootStore } from '@carpool/dashboard/redux';
import { useNavigate } from 'react-router-dom';

export function ResetPassword() {
  const theme = createTheme();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const userState = useSelector((state: RootStore) => state.user);

  useEffect(() => {
    if (userState.user) {
      navigate('/');
    }
  }, [userState.user, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      password: data.get('password'),
      passwordConfirm: data.get('passwordConfirm'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
            <img
              src={require('./logo_text.png')}
              alt="Carpool logo"
              style={{ width: '70%' }}
            />
            <Typography
              component="h1"
              variant="h5"
              style={{
                textAlign: 'center',
                width: '100%',
                fontWeight: '700',
                paddingTop: 40,
              }}
            >
              Reset Password
            </Typography>
            <Typography
              component="p"
              style={{
                textAlign: 'center',
                width: '100%',
                paddingTop: '0.5rem',
                color: '#999',
              }}
            >
              Please create your new password
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
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                id="passwordConfirm"
                autoComplete="current-password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: 50, p: 1 }}
              >
                Reset
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default ResetPassword;
