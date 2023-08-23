import React, { useState, useEffect } from 'react';
import { getContact } from '../../../apis/Contacts';
import RecentsSkeleton from './RecentsSkeleton';
import useTitle from '../../../hooks/useTitle';
import ContactAvatar from '../contacts/ContactAvatar';

import Box from '@mui/material/Box';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import FemaleOutlined from '@mui/icons-material/FemaleOutlined';
import MaleOutlined from '@mui/icons-material/MaleOutlined';
import Paper from '@mui/material/Paper';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import Typography from '@mui/material/Typography';

const Recents = () => {
  useTitle('Recents');
  const [recentContactIds, setRecentContactIds] = useState(
    JSON.parse(localStorage.getItem('recentContactIds')) || []
  );
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecentContacts();
  }, []);

  const fetchRecentContacts = async () => {
    const token = sessionStorage.getItem('token');

    const promiseData = await Promise.all(
      recentContactIds.map(async (id) => {
        try {
          const response = await getContact(token, id);
          if (response.status === 200) {
            return response.data;
          }
        } catch (error) {
          console.log(error);
        }
      })
    );
    setContacts(promiseData);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <RecentsSkeleton />
      ) : recentContactIds.length === 0 ? (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <RecentActorsIcon sx={{ fontSize: 200 }} color='accent' />
          <Typography variant='h3' color='accent.main'>
            No recent contacts
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}>
          {contacts.map((contact) => (
            <Paper
              key={contact._id}
              variant='outlined'
              sx={{
                width: 1,
                display: 'flex',
                flexGrow: 1,
                flexDirection: 'column',
                bgcolor: 'secondary.main',
                borderColor: 'accent.main'
              }}>
              <Box sx={{ m: 3, display: 'flex', alignItems: 'center' }}>
                <Box>
                  <ContactAvatar contact={contact} size={200} />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                  }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                    <Typography variant='h3' color='accent.main'>
                      {contact.fullName}
                    </Typography>
                    {contact.gender === 'Male' ? (
                      <MaleOutlined color='accent' sx={{ fontSize: 50 }} />
                    ) : (
                      <FemaleOutlined color='accent' sx={{ fontSize: 50 }} />
                    )}
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                      <EmailOutlined color='accent' />
                      <Typography color='accent.main'>
                        {contact.emailAddress}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </>
  );
};

export default Recents;
