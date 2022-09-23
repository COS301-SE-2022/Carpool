import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardPage } from '@carpool/dashboard/pages';
import { LoginPage } from '@carpool/dashboard/pages';
import { ResetPassword } from '@carpool/dashboard/pages';
import { Sidebar } from '@carpool/dashboard/components';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export function App() {
  const path = useLocation().pathname;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        {path !== '/login' && path !== '/reset' && <Sidebar />}
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset" element={<ResetPassword />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
