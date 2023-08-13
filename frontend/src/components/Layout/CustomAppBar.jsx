import React from 'react';
import AppBar from '@mui/material/AppBar';
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
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={props.handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}>
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' noWrap component='div'>
          Welcome back {props.user.firstName}!
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
