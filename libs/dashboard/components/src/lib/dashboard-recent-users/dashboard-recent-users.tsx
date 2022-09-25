import React from 'react';
import {
  Grid,
  Typography,
  TableContainer,
  Table,
  TableCell,
  TableBody,
  TableRow,
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

function createData(name: string, calories: number) {
  return { name, calories };
}

const rows = [
  createData('Frozen yoghurt', 159),
  createData('Ice cream sandwich', 237),
  createData('Eclair', 262),
  createData('Cupcake', 305),
  createData('Gingerbread', 356),
];

export function DashboardRecentUsers() {
  return (
    <Grid item xs={12} md={8} lg={8}>
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
  );
}

export default DashboardRecentUsers;
