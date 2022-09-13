import React, { useState, useEffect } from 'react';
import {
  Typography,
  Container,
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootStore } from '@carpool/dashboard/redux';

export function DashboardPage() {
  // const navigate = useNavigate();

  // const userState = useSelector((state: RootStore) => state.user);

  // useEffect(() => {
  //   if (!userState.user) {
  //     navigate('/login');
  //   }
  // }, [userState.user, navigate]);

  return (
    <Container>
      <Typography variant="h5">Welcome to DashboardPage!</Typography>
      <Stack sx={{ pt: 3 }}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="View Users"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="View User Details"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="View tutors"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="View tutor details"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Approve/Decline tutors"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Approve/Decline tutor subjects"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="View students"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="View student details"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="View subjects"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Disable/Enable subjects"
          />
          <FormControlLabel control={<Checkbox />} label="Add subjects" />
        </FormGroup>
      </Stack>
    </Container>
  );
}

export default DashboardPage;
