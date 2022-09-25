import React from 'react';
import { Typography } from '@mui/material';

type UserProfileContentProps = {
  title: string;
  value?: string;
  icon?: React.ReactNode;
};

export function UserProfileContent({
  title,
  value,
  icon,
}: UserProfileContentProps) {
  return (
    <Typography
      sx={{
        textAlign: 'left',
        pt: 1,
        fontWeight: '600',
        color: '#000',
        my: 1,
      }}
    >
      {title}:{' '}
      <span
        style={{
          color: '#777',
          fontWeight: '400',
          marginLeft: 10,
        }}
      >
        {value ? value : icon}
      </span>
    </Typography>
  );
}

export default UserProfileContent;
