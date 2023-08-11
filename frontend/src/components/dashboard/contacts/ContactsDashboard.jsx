import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

const Dashboard = () => {
  return (
    <Paper
      variant='outlined'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'secondary.main',
        borderColor: 'accent.main'
      }}>
      <Box sx={{ m: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <SearchIcon sx={{ mr: 1 }}></SearchIcon>
          <TextField
            placeholder='Search contacts'
            color='accent'
            variant='standard'
            type='search'
            fullWidth></TextField>
        </Box>
        <Box>
          <Paper
            variant='outlined'
            sx={{
              bgcolor: 'secondary.main',
              borderColor: 'accent.main',
              overflow: 'hidden'
            }}>
            <List
              sx={{
                width: '100%',
                maxWidth: 1,
                bgcolor: 'secondary.main',
                position: 'relative',
                overflow: 'auto',
                maxHeight: { xs: '60vh', sm: 700 },
                '& ul': { padding: 0 }
              }}
              subheader={<li />}>
              {[0, 1, 2, 3, 4].map((sectionId) => (
                <li key={`section-${sectionId}`}>
                  <ul>
                    <ListSubheader
                      sx={{
                        bgcolor: 'primary.main'
                      }}>{`I'm sticky ${sectionId}`}</ListSubheader>
                    {[0, 1, 2].map((item) => (
                      <ListItem key={`item-${sectionId}-${item}`}>
                        <ListItemText primary={`Item ${item}`} />
                      </ListItem>
                    ))}
                  </ul>
                </li>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
      <Box></Box>
    </Paper>
  );
};

export default Dashboard;
