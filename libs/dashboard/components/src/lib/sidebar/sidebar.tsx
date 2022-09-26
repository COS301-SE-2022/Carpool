import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import {
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CssBaseline,
  Box,
  Drawer,
  Button,
  Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { AppDispatch, logout } from '@carpool/dashboard/redux';

const sidebarWidth = 240;

interface Props {
  window?: () => Window;
}

export function Sidebar(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { window } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div style={{ height: '90%' }}>
      <Toolbar
        style={{
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="img"
          sx={{
            width: 150,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="Carpool Logo"
          src={require('./logo_text.png')}
        />
      </Toolbar>
      <Divider />
      <Stack
        direction="column"
        sx={{ height: '100%' }}
        justifyContent="space-between"
      >
        <List>
          {['Dashboard', 'Trips', 'Users'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <Link
                to={`/${text[0].toLowerCase() + text.slice(1)}`}
                style={{ textDecoration: 'none' }}
              >
                <ListItemButton>
                  <ListItemText style={{ color: '#212121' }} primary={text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Button
          onClick={handleLogout}
          sx={{ mx: 2, backgroundColor: '#188aed' }}
          variant="contained"
        >
          Logout
        </Button>
      </Stack>
    </div>
  );

  return (
    <Fragment>
      <CssBaseline />
      <Box
        component="nav"
        sx={{
          width: { sm: sidebarWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: sidebarWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: sidebarWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Fragment>
  );
}

export default Sidebar;
