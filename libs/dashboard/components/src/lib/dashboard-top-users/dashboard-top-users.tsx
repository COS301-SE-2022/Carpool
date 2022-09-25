import React from 'react';
import {
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 10,
}));

type TopUser = {
  university: string;
  _count: {
    university: number;
  };
};

type DashboardTopUsersType = {
  title: string;
  data: TopUser[];
};

export function DashboardTopUsers({ data, title }: DashboardTopUsersType) {
  return (
    <Grid item xs={12} md={4} lg={4}>
      <Item
        sx={{
          height: '100%',
          mx: 2,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <Typography variant="h6" sx={{ textAlign: 'left', pl: 2, pt: 1 }}>
          {title}
        </Typography>
        <TableContainer>
          <Table sx={{ minWidth: '100%' }} aria-label="simple table">
            <TableBody>
              {data.map((university, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {university.university}
                  </TableCell>
                  <TableCell>{university._count.university}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Item>
    </Grid>
  );
}

export default DashboardTopUsers;
