import React, { useState, useEffect } from 'react';
import {
  Typography,
  Container,
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootStore } from '@carpool/dashboard/redux';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from 'recharts';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function createData(name: string, calories: number) {
  return { name, calories };
}

function createGraphData(time: string, amount?: number) {
  return { time, amount };
}

const data = [
  createGraphData('00:00', 0),
  createGraphData('03:00', 300),
  createGraphData('06:00', 600),
  createGraphData('09:00', 800),
  createGraphData('12:00', 1500),
  createGraphData('15:00', 2000),
  createGraphData('18:00', 2400),
  createGraphData('21:00', 2400),
  createGraphData('24:00', 0),
];

const rows = [
  createData('Frozen yoghurt', 159),
  createData('Ice cream sandwich', 237),
  createData('Eclair', 262),
  createData('Cupcake', 305),
  createData('Gingerbread', 356),
];

export function DashboardPage() {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
        backgroundColor: '#dbdbdb',
        px: 2,
      }}
    >
      <Stack
        sx={{
          flex: 1,
          px: 4,
          pt: 3,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Stack sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: '600' }}>
            Dashboard
          </Typography>
        </Stack>
        <Stack
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            pr: 3,
          }}
        >
          <img
            src={require('./ben.png')}
            alt="profile pic"
            style={{ width: '5%', borderRadius: '50%', marginRight: 10 }}
          />
          <Typography variant="h6" sx={{ fontWeight: '600' }}>
            Benjamin
          </Typography>
        </Stack>
      </Stack>
      <Stack sx={{ flex: 3 }}>
        <Grid container sx={{ height: '100%', mt: 2, mb: 2 }}>
          <Grid item xs={12} md={6} lg={3}>
            <Item
              sx={{
                height: '100%',
                mx: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="h6">100</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">Trips</Typography>
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Item
              sx={{
                height: '100%',
                mx: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="h6">30</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">Users</Typography>
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Item
              sx={{
                height: '100%',
                mx: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="h6">15</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">Drivers</Typography>
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Item
              sx={{
                height: '100%',
                mx: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="h6">300</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">Bookings</Typography>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Stack>
      <Stack sx={{ flex: 8 }}>
        <Grid container sx={{ height: '100%', my: 2 }}>
          <Grid item xs={8}>
            <Item
              sx={{
                height: '100%',
                mx: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <React.Fragment>
                <Typography
                  component="h2"
                  variant="h6"
                  color="#777"
                  gutterBottom
                >
                  Today
                </Typography>
                <ResponsiveContainer>
                  <LineChart
                    data={data}
                    margin={{
                      top: 16,
                      right: 16,
                      bottom: 0,
                      left: 24,
                    }}
                  >
                    <XAxis
                      dataKey="time"
                      stroke={theme.palette.text.secondary}
                    />
                    <YAxis stroke={theme.palette.text.secondary}>
                      <Label angle={270} position="left">
                        Sales ($)
                      </Label>
                    </YAxis>
                    <Line
                      isAnimationActive={false}
                      type="monotone"
                      dataKey="amount"
                      stroke={theme.palette.primary.main}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </React.Fragment>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item
              sx={{
                height: '100%',
                mx: 2,
                px: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" sx={{ textAlign: 'left', pl: 2, pt: 1 }}>
                Top Users
              </Typography>
              <TableContainer>
                <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>{row.calories}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Item>
          </Grid>
        </Grid>
      </Stack>
      <Stack sx={{ flex: 8 }}>
        <Grid container sx={{ height: '100%', my: 2, mb: 3 }}>
          <Grid item xs={8}>
            <Item
              sx={{
                height: '100%',
                mx: 2,
                px: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" sx={{ textAlign: 'left', pl: 2, pt: 1 }}>
                Recent Users
              </Typography>
              <TableContainer>
                <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>{row.calories}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item
              sx={{
                height: '100%',
                mx: 2,
                px: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" sx={{ textAlign: 'left', pl: 2, pt: 1 }}>
                Top Destinations
              </Typography>
              <TableContainer>
                <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>{row.calories}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Item>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
}

export default DashboardPage;
