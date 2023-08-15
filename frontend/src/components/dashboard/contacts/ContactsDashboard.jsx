import React, { useEffect, useState } from 'react';
import { getContacts } from '../../../apis/Contacts';
import ContactsList from './ContactsList';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showStarIcon, setShowStarIcon] = useState(false);

  const groupedContacts = contacts.reduce((acc, user) => {
    const firstLetter = user.firstName.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(user);
    return acc;
  }, {});

  useEffect(() => {
    fetchContacts();
  }, []);

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleFavoriteIcon = () => {
    setShowStarIcon((prevShowStarIcon) => !prevShowStarIcon);
  };

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
            onChange={handleSearchChange}
            placeholder='Search contacts'
            color='accent'
            variant='standard'
            type='search'
            autoComplete='off'
            fullWidth
          />
          <IconButton onClick={toggleFavoriteIcon} sx={{ mr: 2 }}>
            {showStarIcon ? <StarIcon /> : <StarBorderOutlinedIcon />}
          </IconButton>
        </Box>

        <ContactsList
          contacts={contacts}
          groupedContacts={groupedContacts}
          searchTerm={searchTerm}
          showStarIcon={showStarIcon}
        />
      </Box>
    </Paper>
  );
};

export default Dashboard;
