import React from 'react';
import { Outlet } from 'react-router';
import Box from '@mui/material/Box';
import CustomAppBar from './CustomAppBar';
import CustomDrawer from './CustomDrawer';
import Toolbar from '@mui/material/Toolbar';

const drawerWidth = 240;

const Layout = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CustomAppBar
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />

      <CustomDrawer
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        container={container}
      />
      
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
