import React from 'react';
import { Stack, Typography } from '@mui/material';

type DashboardTitleProps = {
  title: string;
};

export function DashboardTitle({ title }: DashboardTitleProps) {
  return (
    <Stack
      sx={{
        flex: 1,
        px: 4,
        pt: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Stack sx={{ flex: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: '600' }}>
          {title}
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
          style={{ width: 35, borderRadius: '50%', marginRight: 10 }}
        />
        <Typography variant="h6" sx={{ fontWeight: '600' }}>
          Benjamin
        </Typography>
      </Stack>
    </Stack>
  );
}

export default DashboardTitle;
