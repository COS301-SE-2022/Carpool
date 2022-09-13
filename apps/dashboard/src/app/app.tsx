import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardPage } from '@carpool/dashboard/pages';
import { LoginPage } from '@carpool/dashboard/pages';
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
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        {useLocation().pathname !== '/login' && <Sidebar />}
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
