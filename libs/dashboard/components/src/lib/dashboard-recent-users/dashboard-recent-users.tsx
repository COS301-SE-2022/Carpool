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
import { formatDate } from '@carpool/client/shared/utilities';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 10,
}));

type RecentUsersProps = {
  data: RecentUser[];
};

type RecentUser = {
  profilePic: string;
  name: string;
  surname: string;
  university: string;
  createdAt: string;
};

export function DashboardRecentUsers({ data }: RecentUsersProps) {
  return (
    <Grid item xs={12} md={8} lg={8}>
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
          Recent Users
        </Typography>
        <TableContainer>
          <Table sx={{ minWidth: '100%' }} aria-label="simple table">
            <TableBody>
              {data.map((user, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell
                    scope="row"
                    align="left"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <img
                      src={require('./ben.png')}
                      alt="user profile pic"
                      style={{
                        width: 30,
                        borderRadius: '50%',
                        marginRight: 10,
                      }}
                    />
                    {user.name} {user.surname}
                  </TableCell>
                  <TableCell>{user.university}</TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
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
