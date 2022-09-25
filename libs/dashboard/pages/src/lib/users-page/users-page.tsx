import React, { useEffect } from 'react';
import { DashboardTitle } from '@carpool/dashboard/components';
import {
  Stack,
  CircularProgress,
  Typography,
  TableContainer,
  Table,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  TableHead,
  Button,
} from '@mui/material';
import { formatDate } from '@carpool/client/shared/utilities';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import { RootStore, AppDispatch, listUsers } from '@carpool/dashboard/redux';
import { useDispatch, useSelector } from 'react-redux';

export function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const userListState = useSelector((state: RootStore) => state.userList);
  const { status, error, users } = userListState;

  useEffect(() => {
    if (!users) {
      dispatch(listUsers());
    }
  }, [dispatch, users]);

  return (
    <Stack sx={{ width: '100%' }}>
      {status === 'loading' ? (
        <Stack
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '80vw',
          }}
        >
          <CircularProgress />
        </Stack>
      ) : (
        users && (
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
              width: '100%',
              backgroundColor: '#f2f2f2',
              px: 2,
            }}
          >
            <DashboardTitle title="Users" />
            <Stack sx={{ flex: 10 }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">User</TableCell>
                      <TableCell>Cellphone</TableCell>
                      <TableCell>University</TableCell>
                      <TableCell>Student No</TableCell>
                      <TableCell align="center">Driver</TableCell>
                      <TableCell align="center">Joined</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Stack
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            <img
                              src={require('./ben.png')}
                              alt="user profile pic"
                              style={{
                                width: 35,
                                borderRadius: '50%',
                                marginRight: 20,
                              }}
                            />
                            <Stack>
                              <Typography
                                variant="body1"
                                sx={{ fontWeight: 600 }}
                              >
                                {user.name} {user.surname}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: '#9e9e9e' }}
                              >
                                {user.email}
                              </Typography>
                            </Stack>
                          </Stack>
                        </TableCell>
                        <TableCell>{user.cellNumber}</TableCell>
                        <TableCell>{user.university}</TableCell>
                        <TableCell>{user.studentNumber}</TableCell>
                        <TableCell align="center">
                          {user.isDriver ? (
                            <CheckCircleIcon sx={{ color: '#038C0C' }} />
                          ) : (
                            <CancelIcon sx={{ color: '#C00' }} />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {formatDate(user.createdAt)}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: '#188aed',
                              borderRadius: 20,
                            }}
                            onClick={() => navigate(`/users/${user.id}`)}
                          >
                            Profile
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Stack>
        )
      )}
    </Stack>
  );
}

export default UsersPage;
