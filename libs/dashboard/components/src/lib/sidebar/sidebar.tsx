import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import {
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  IconButton,
  CssBaseline,
  AppBar,
  Box,
  Drawer,
  Button,
  Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const sidebarWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export function Sidebar(props: Props) {
  const dispatch = useDispatch();
  const { window } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    console.log('logout');
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div>
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
            width: 90,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="Carpool Logo"
          src="./AppIcon.png"
        />
      </Toolbar>
      <Divider />
      <Stack direction="column" justifyContent="space-between">
        <List>
          {['Dashboard', 'Trips', 'Drivers', 'Users'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <Link to={`/${text}`} style={{ textDecoration: 'none' }}>
                <ListItemButton>
                  <ListItemText style={{ color: '#212121' }} primary={text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Stack>
    </div>
  );

  return (
    <Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${sidebarWidth}px)` },
          ml: { sm: `${sidebarWidth}px` },
        }}
      >
        <Toolbar
          style={{
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Stack>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
          <Button variant="contained" sx={{ mx: 3 }} onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: sidebarWidth }, flexShrink: { sm: 0 } }}
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
