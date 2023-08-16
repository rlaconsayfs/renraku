import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../apis/User';
import CustomAppBar from './CustomAppBar';
import CustomDrawer from './CustomDrawer';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const drawerWidth = 240;

const Layout = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token === null) {
      navigate('/login');
    } else {
      const fetchUser = async () => {
        try {
          if (user === null) {
            const response = await getUser(token); // Pass the token here
            if (response.status === 200) {
              setUser(response.data);
            }
          }
        } catch (error) {
          console.log(error);
          // navigate('/login');
        }
      };
      fetchUser();
    }
  }, [navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return user ? (
    <Box sx={{ display: 'flex' }}>
      <CustomAppBar
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
        user={user}
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
          p: { xs: 0, md: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          transition: 'padding 0.3s ease-in-out'
        }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  ) : null;
};

export default Layout;
