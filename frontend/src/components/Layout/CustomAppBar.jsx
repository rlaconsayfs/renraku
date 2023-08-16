import React from 'react';
import UserMenu from './UserMenu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const CustomAppBar = (props) => {
  return (
    <AppBar
      position='fixed'
      color='secondary'
      sx={{
        width: { sm: `calc(100% - ${props.drawerWidth}px)` },
        ml: { sm: `${props.drawerWidth}px` }
      }}>
      <Toolbar>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
          }}>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={props.handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1 }}>
            Welcome back {props.user.firstName}!
          </Typography>
          <UserMenu user={props.user} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
