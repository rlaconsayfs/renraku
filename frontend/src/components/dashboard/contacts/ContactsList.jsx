import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ContactAvatar from './ContactAvatar';

const ContactsList = (props) => {
  const { contacts, groupedContacts } = props;
  const navigate = useNavigate();

  if (contacts.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 3
        }}>
        <Typography variant='h5' sx={{ mb: 1 }}>
          You have no contacts yet
        </Typography>
        <Button
          variant='outlined'
          color='accent'
          onClick={() => navigate('/create')}>
          Create one?
        </Button>
      </Box>
    );
  } else {
    return (
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
            {Object.keys(groupedContacts).map((letter) => (
              <li key={`section-${letter}`}>
                <ul>
                  <ListSubheader
                    sx={{
                      bgcolor: 'primary.main'
                    }}>
                    {`${letter}`}
                  </ListSubheader>
                  {groupedContacts[letter].map((user) => (
                    <ListItem
                      key={`item-${letter}-${user.id}`}
                      onClick={() => alert('hello')}
                      sx={{
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        ':hover': {
                          bgcolor: '#CCC4C0'
                        }
                      }}>
                      <ContactAvatar user={user} />
                      <ListItemText
                        primary={`${user.firstName} ${user.lastName}`}
                      />
                    </ListItem>
                  ))}
                </ul>
              </li>
            ))}
          </List>
        </Paper>
      </Box>
    );
  }
};

export default ContactsList;
