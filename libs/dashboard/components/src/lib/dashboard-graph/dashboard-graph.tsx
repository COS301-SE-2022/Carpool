import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 10,
}));

type TripsForYear = {
  month: string;
  trips: number;
};

type GraphProps = {
  data: TripsForYear[];
};

export function DashboardGraph({ data: tripsData }: GraphProps) {
  const theme = useTheme();

  console.log(tripsData);

  return (
    <Grid item xs={12} md={8} lg={8}>
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
          <Typography component="h2" variant="h6" color="#777" gutterBottom>
            {new Date().getFullYear()} Trips
          </Typography>
          <ResponsiveContainer>
            <LineChart
              data={tripsData}
              margin={{
                top: 16,
                right: 16,
                bottom: 0,
                left: 24,
              }}
            >
              <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
              <YAxis stroke={theme.palette.text.secondary}>
                <Label angle={270} position="left">
                  Trips
                </Label>
              </YAxis>
              <Line
                isAnimationActive={false}
                type="monotone"
                dataKey="trips"
                stroke={theme.palette.primary.main}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </React.Fragment>
      </Item>
    </Grid>
  );
}

export default DashboardGraph;
