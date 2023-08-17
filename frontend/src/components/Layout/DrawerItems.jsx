import React from 'react';
import { useNavigate } from 'react-router-dom';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ContactsIcon from '@mui/icons-material/Contacts';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HistoryIcon from '@mui/icons-material/History';

const DrawerItems = () => {
  const navigate = useNavigate();

  const menuItems1 = [
    {
      text: 'Contacts',
      icon: <ContactsIcon />,
      path: '/'
    },
    {
      text: 'Recents',
      icon: <HistoryIcon />,
      path: '/recents'
    }
  ];

  const menuItems2 = [
    {
      text: 'Add a new Contact',
      icon: <AddCircleIcon />,
      path: '/create'
    }
  ];

  return (
    <div>
      <Toolbar>
        <Typography variant='h5' sx={{ letterSpacing: 3 }}>
          Renraku
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems1.map((item, index) => {
          const { text, icon, path } = item;
          return (
            <ListItem disablePadding key={index} onClick={() => navigate(path)}>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        {menuItems2.map((item, index) => {
          const { text, icon, path } = item;
          return (
            <ListItem disablePadding key={index} onClick={() => navigate(path)}>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default DrawerItems;
