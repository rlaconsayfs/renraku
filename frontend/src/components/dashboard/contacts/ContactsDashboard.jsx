import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../../App';
import { getContacts } from '../../../apis/Contacts';
import ContactsList from './ContactsList';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

const Dashboard = () => {
  const [user, setUser] = useContext(UserContext);
  const [contacts, setContacts] = useState([]);

  const groupedContacts = contacts.reduce((acc, user) => {
    const firstLetter = user.firstName.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(user);
    return acc;
  }, {});

  const fetchContacts = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await getContacts(token);
      if (response.status === 200) {
        console.log(response.data);
        setContacts(response.data);
      } else if (response.status === 204) {
        console.log('No contacts found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

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

        <ContactsList contacts={contacts} groupedContacts={groupedContacts} />
      </Box>
    </Paper>
  );
};

export default Dashboard;
