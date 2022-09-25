import React from 'react';
import { Grid, Stack, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 10,
}));

type DashboardSmallCardProps = {
  title: string;
  value: string;
  icon?: React.ReactNode;
};

export function DashboardSmallCard({
  title,
  value,
  icon,
}: DashboardSmallCardProps) {
  return (
    <Grid item xs={12} md={6} lg={3}>
      <Item
        sx={{
          height: '100%',
          mx: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Grid container sx={{ px: 2 }}>
          <Grid item xs={6}>
            <Stack sx={{ display: 'flex' }}>
              <Typography sx={{ fontWeight: '600', textAlign: 'left' }}>
                {title}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: '#000',
                  fontWeight: '600',
                  textAlign: 'left',
                }}
              >
                {value}
              </Typography>
            </Stack>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Paper
              sx={{
                backgroundColor: '#188aed',
                height: '100%',
                px: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {icon}
            </Paper>
          </Grid>
        </Grid>
      </Item>
    </Grid>
  );
}

export default DashboardSmallCard;
