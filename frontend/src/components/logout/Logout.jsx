import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const Logout = () => {
  useTitle('Logout');
  
  const navigate = useNavigate();

  useEffect(() => {
    loggingOut();
  }, []);

  const loggingOut = async () => {
    setTimeout(() => {
      if (sessionStorage.getItem('token')) {
        sessionStorage.removeItem('token');
      }
      navigate('/login');
    }, 2000);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
      <CircularProgress size={80} thickness={2} />
      <Typography>Logging out...</Typography>
    </Box>
  );
};

export default Logout;
