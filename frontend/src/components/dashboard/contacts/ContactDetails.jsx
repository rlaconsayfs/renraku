import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Chip, Container, Divider, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ContactAvatar from './ContactAvatar';
import { getContact } from '../../../apis/Contacts';

const ContactDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedContact, setSelectedContact] = useState({});

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    const token = sessionStorage.getItem('token');
    const response = await getContact(token, id);
    console.log(response);
    setSelectedContact(response.data);
    console.log(selectedContact);
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          <Button
            onClick={() => navigate('/')}
            color='accent'
            variant='text'
            startIcon={<ArrowBackIcon />}>
            Contacts
          </Button>
          <Button color='accent' variant='outlined' startIcon={<EditIcon />}>
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
              <ContactAvatar contact={selectedContact} size={320} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' }
              }}>
              <Typography
                variant='subtitle1'
                color='accent.main'
                sx={{
                  fontStyle: 'italic'
                }}>
                First Name
              </Typography>
              <Typography
                variant='h4'
                color='accent.main'
                gutterBottom
                sx={{
                  fontSize: { xs: '3rem', md: '4rem' },
                  lineHeight: '0.8'
                }}>
                {selectedContact.firstName}
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
                  lineHeight: '0.8'
                }}>
                {selectedContact.lastName}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ mb: { xs: 3, md: 5 } }} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: { xs: 2, md: 15 },
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
                variant='subtitle1'
                color='accent.main'
                sx={{
                  fontStyle: 'italic'
                }}>
                Gender
              </Typography>
              <Typography
                variant='h4'
                color='accent.main'
                gutterBottom
                sx={{
                  fontSize: '2rem',
                  lineHeight: '0.8'
                }}>
                {selectedContact.gender}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                justifyContent: 'flex-start'
              }}>
              <Typography
                variant='subtitle1'
                color='accent.main'
                sx={{
                  fontStyle: 'italic'
                }}>
                Relationship
              </Typography>
              <Typography
                variant='h4'
                color='accent.main'
                gutterBottom
                sx={{
                  fontSize: '2rem',
                  lineHeight: '0.8'
                }}>
                {selectedContact.relationship}
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              mb: { xs: 3, md: 5 }
            }}>
            <Chip label='Addresses' color='accent' />
          </Divider>
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
                variant='subtitle1'
                color='accent.main'
                sx={{
                  fontStyle: 'italic'
                }}>
                Email Address
              </Typography>
              <Typography
                variant='h4'
                color='accent.main'
                gutterBottom
                sx={{
                  fontSize: '2rem',
                  lineHeight: '1',
                  textAlign: { xs: 'center', md: 'left' }
                }}>
                {selectedContact.emailAddress}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                justifyContent: 'flex-start'
              }}>
              <Typography
                variant='subtitle1'
                color='accent.main'
                sx={{
                  fontStyle: 'italic'
                }}>
                Billing Address
              </Typography>
              <Typography
                variant='h4'
                color='accent.main'
                gutterBottom
                sx={{
                  fontSize: '2rem',
                  lineHeight: '1',
                  textAlign: { xs: 'center', md: 'left' }
                }}>
                {selectedContact.billingAddress}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                justifyContent: 'flex-start'
              }}>
              <Typography
                variant='subtitle1'
                color='accent.main'
                sx={{
                  fontStyle: 'italic'
                }}>
                Delivery Address
              </Typography>
              <Typography
                variant='h4'
                color='accent.main'
                gutterBottom
                sx={{
                  fontSize: '2rem',
                  lineHeight: '1',
                  textAlign: { xs: 'center', md: 'left' }
                }}>
                {selectedContact.deliveryAddress}
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              mb: { xs: 3, md: 5 }
            }}>
            <Chip label='Phone Numbers' color='accent' />
          </Divider>
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
                variant='subtitle1'
                color='accent.main'
                sx={{
                  fontStyle: 'italic'
                }}>
                Label
              </Typography>
              <Typography
                variant='h4'
                color='accent.main'
                gutterBottom
                sx={{
                  fontSize: '2rem',
                  lineHeight: '0.8',
                  textAlign: { xs: 'center', md: 'left' }
                }}>
                0910 910 9109
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default ContactDetails;
