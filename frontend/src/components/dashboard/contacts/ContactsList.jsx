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
  const { contacts, groupedContacts, searchTerm } = props;
  const navigate = useNavigate();

  // Filter contacts based on the search term
  const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Determine whether to use filteredContacts or all contacts
  const displayedContacts = searchTerm ? filteredContacts : contacts;

  if (displayedContacts.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 3
        }}>
        <Typography variant='h5' sx={{ mb: 1 }}>
          {searchTerm
            ? 'No matching contacts found'
            : 'You have no contacts yet'}
        </Typography>
        {searchTerm && (
          <Button
            variant='outlined'
            color='accent'
            onClick={() => navigate('/create')}>
            Create one?
          </Button>
        )}
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
            {Object.keys(groupedContacts)
              .sort() // Sort the keys alphabetically
              .map((letter) => {
                const contactsInGroup = displayedContacts
                  .filter((contact) =>
                    contact.fullName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .filter(
                    (contact) =>
                      contact.firstName.charAt(0).toUpperCase() === letter
                  );

                if (contactsInGroup.length === 0) {
                  return null; // Skip rendering subheader and list if there are no matches
                }

                return (
                  <li key={`section-${letter}`}>
                    <ul>
                      <ListSubheader
                        sx={{
                          bgcolor: 'primary.main'
                        }}>
                        {`${letter}`}
                      </ListSubheader>
                      {contactsInGroup.map((contact) => (
                        <ListItem
                          key={`item-${letter}-${contact.id}`}
                          onClick={() => alert(contact.id)}
                          sx={{
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            ':hover': {
                              bgcolor: '#CCC4C0'
                            }
                          }}>
                          <ContactAvatar contact={contact} />
                          <ListItemText
                            primary={`${contact.firstName} ${contact.lastName}`}
                          />
                        </ListItem>
                      ))}
                    </ul>
                  </li>
                );
              })}
          </List>
        </Paper>
      </Box>
    );
  }
};

export default ContactsList;
