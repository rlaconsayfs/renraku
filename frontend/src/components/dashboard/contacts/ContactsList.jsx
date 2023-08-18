import React from 'react';
import { useNavigate } from 'react-router-dom';
import ContactAvatar from './ContactAvatar';
import { patchContactIsFavorite } from '../../../apis/Contacts';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Paper from '@mui/material/Paper';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';

const ContactsList = (props) => {
  const { contacts, setContacts, groupedContacts, searchTerm, showStarIcon } =
    props;
  const navigate = useNavigate();

  const handleContactClick = (id) => {
    // Get the current list of recent contact IDs from local storage
    const recentContactIds =
      JSON.parse(localStorage.getItem('recentContactIds')) || [];

    // Remove the clicked contact ID if it's already in the list
    const updatedContactIds = recentContactIds.filter(
      (contactId) => contactId !== id
    );

    // Add the clicked contact ID at the beginning of the list
    updatedContactIds.unshift(id);

    // Keep only the most recent 3 contact IDs
    if (updatedContactIds.length > 3) {
      updatedContactIds.pop();
    }

    // Update the recent contact IDs list in local storage
    localStorage.setItem('recentContactIds', JSON.stringify(updatedContactIds));

    navigate(`/contacts/${id}`);
  };

  // Filter contacts based on the search term
  const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Determine whether to use filteredContacts or all contacts
  const displayedContacts = searchTerm ? filteredContacts : contacts;

  const filteredAndFavoriteContacts = showStarIcon
    ? displayedContacts.filter((contact) => contact.isFavorite)
    : displayedContacts;

  const handleFavoriteClick = async (e, id, isFavorite) => {
    e.stopPropagation();
    const token = sessionStorage.getItem('token');
    try {
      const response = await patchContactIsFavorite(token, id, !isFavorite);
      if (response.status === 200) {
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact.id === id
              ? { ...contact, isFavorite: !isFavorite }
              : contact
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (filteredAndFavoriteContacts.length === 0) {
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
              maxHeight: { xs: '80dvh', sm: 750 },
              '& ul': { padding: 0 }
            }}
            subheader={<li />}>
            {Object.keys(groupedContacts)
              .sort() // Sort the keys alphabetically
              .map((letter) => {
                const contactsInGroup = filteredAndFavoriteContacts
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
                          onClick={() => handleContactClick(contact.id)}
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
                          {contact.isFavorite ? (
                            <IconButton
                              onClick={(e) =>
                                handleFavoriteClick(
                                  e,
                                  contact.id,
                                  contact.isFavorite
                                )
                              }>
                              <StarIcon />
                            </IconButton>
                          ) : (
                            <IconButton
                              onClick={(e) =>
                                handleFavoriteClick(
                                  e,
                                  contact.id,
                                  contact.isFavorite
                                )
                              }>
                              <StarBorderOutlinedIcon />
                            </IconButton>
                          )}
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
