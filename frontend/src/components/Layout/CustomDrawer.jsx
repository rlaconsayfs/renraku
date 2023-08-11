import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import DrawerItems from './DrawerItems';

const CustomDrawer = (props) => {
  return (
    <Box
      component='nav'
      sx={{ width: { sm: props.drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label='mailbox folders'>
      <Drawer
        container={props.container}
        variant='temporary'
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: props.drawerWidth,
            bgcolor: 'secondary.main'
          }
        }}>
        <DrawerItems />
      </Drawer>
      <Drawer
        variant='permanent'
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: props.drawerWidth,
            bgcolor: 'secondary.main'
          }
        }}
        open>
        <DrawerItems />
      </Drawer>
    </Box>
  );
};

export default CustomDrawer;
