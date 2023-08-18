import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import { deleteUser } from '../../../apis/User';
import useTitle from '../../../hooks/useTitle';
import DeleteUserDialog from './DeleteUserDialog';

import Avatar from '@mui/material/Avatar';
import BadgeIcon from '@mui/icons-material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import WarningIcon from '@mui/icons-material/Warning';

const UserDetails = () => {
  const [user, setUser] = useContext(UserContext);
  useTitle(`Profile | ${user.username}`);

  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleDialogDelete = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await deleteUser(token, user.id);
      if (response.status === 200) {
        console.log('User deleted');
        navigate('/logout');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Paper
        variant='outlined'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'secondary.main',
          borderColor: 'accent.main'
        }}>
        <Box sx={{ m: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end'
            }}>
            <Button
              onClick={() => navigate(`/${user.username}/edit`)}
              color='accent'
              variant='outlined'
              startIcon={<EditIcon />}>
              Edit
            </Button>
          </Box>
          <Box sx={{ mt: 5 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: { xs: 5, md: 6 },
                mb: { xs: 3, md: 5 }
              }}>
              <Box>
                <Avatar sx={{ width: 320, height: 320, fontSize: '5rem' }}>
                  {user.firstName.charAt(0).toUpperCase()}
                  {user.lastName.charAt(0).toUpperCase()}
                </Avatar>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'center', md: 'flex-start' }
                }}>
                <Typography
                  display='flex'
                  variant='subtitle1'
                  color='accent.main'
                  sx={{
                    fontStyle: 'italic'
                  }}>
                  <BadgeIcon sx={{ mr: 0.5 }} />
                  First Name
                </Typography>
                <Typography
                  variant='h4'
                  color='accent.main'
                  gutterBottom
                  sx={{
                    fontSize: { xs: '3rem', md: '4rem' },
                    lineHeight: '0.8',
                    textAlign: { xs: 'center', md: 'left' }
                  }}>
                  {user.firstName}
                </Typography>
                <Typography
                  variant='subtitle1'
                  color='accent.main'
                  sx={{
                    fontStyle: 'italic'
                  }}>
                  Last Name
                </Typography>
                <Typography
                  variant='h4'
                  color='accent.main'
                  gutterBottom
                  sx={{
                    fontSize: { xs: '3rem', md: '4rem' },
                    lineHeight: '0.8',
                    textAlign: { xs: 'center', md: 'left' }
                  }}>
                  {user.lastName}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ mb: { xs: 3, md: 5 } }} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                justifyContent: 'flex-start',
                gap: { xs: 2, md: 2 },
                mb: { xs: 3, md: 4 }
              }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'center', md: 'flex-start' },
                  justifyContent: 'flex-start'
                }}>
                <Typography
                  display='flex'
                  alignItems='center'
                  variant='subtitle1'
                  color='accent.main'
                  sx={{
                    fontStyle: 'italic'
                  }}>
                  <EmailIcon />
                  Email Address
                </Typography>
                <Typography
                  variant='h4'
                  color='accent.main'
                  gutterBottom
                  sx={{
                    fontSize: '2rem',
                    textAlign: { xs: 'center', md: 'left' }
                  }}>
                  {user.email}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
      <Paper
        variant='outlined'
        sx={{
          mt: 3,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'rgba(235, 0, 20, 0.1)',
          borderColor: 'error.main'
        }}>
        <Box sx={{ m: 3 }}>
          <Box>
            <Typography variant='h6' display='flex' alignItems='center'>
              <WarningIcon color='error' sx={{ mr: 0.5 }} />
              Danger Zone
            </Typography>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Button onClick={handleClickOpen} color='error' variant='outlined'>
              Delete Account
            </Button>
            {openDialog && (
              <DeleteUserDialog
                username={user.username}
                open={openDialog}
                handleClose={handleDialogClose}
                handleDelete={handleDialogDelete}
              />
            )}
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default UserDetails;
