import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getContact } from '../../../apis/Contacts';
import ContactAvatar from './ContactAvatar';
import ContactDetailsSkeleton from './ContactDetailsSkeleton';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BadgeIcon from '@mui/icons-material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import FemaleIcon from '@mui/icons-material/Female';
import HandshakeIcon from '@mui/icons-material/Handshake';
import HomeIcon from '@mui/icons-material/Home';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MaleIcon from '@mui/icons-material/Male';
import Paper from '@mui/material/Paper';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import Typography from '@mui/material/Typography';
import WorkIcon from '@mui/icons-material/Work';

const ContactDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedContact, setSelectedContact] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await getContact(token, id);
      if (response.status === 200) {
        setSelectedContact(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
      {isLoading ? (
        <ContactDetailsSkeleton />
      ) : (
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
            <Button
              onClick={() =>
                navigate(`/contacts/${id}/edit`, { state: { selectedContact } })
              }
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
                <ContactAvatar contact={selectedContact} size={320} />
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
                    lineHeight: '0.8',
                    textAlign: { xs: 'center', md: 'left' }
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
                  display='flex'
                  alignItems='center'
                  variant='subtitle1'
                  color='accent.main'
                  sx={{
                    fontStyle: 'italic'
                  }}>
                  {selectedContact.gender === 'Male' ? (
                    <MaleIcon />
                  ) : (
                    <FemaleIcon />
                  )}
                  Gender
                </Typography>
                <Typography
                  variant='h4'
                  color='accent.main'
                  gutterBottom
                  sx={{
                    fontSize: '2rem'
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
                  display='flex'
                  alignItems='center'
                  variant='subtitle1'
                  color='accent.main'
                  sx={{
                    fontStyle: 'italic'
                  }}>
                  <HandshakeIcon />
                  Relationship
                </Typography>
                <Typography
                  variant='h4'
                  color='accent.main'
                  gutterBottom
                  sx={{
                    fontSize: '2rem'
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
                  display='flex'
                  alignItems='center'
                  variant='subtitle1'
                  color='accent.main'
                  sx={{
                    fontStyle: 'italic'
                  }}>
                  <ReceiptIcon />
                  Billing Address
                </Typography>
                <Typography
                  variant='h4'
                  color='accent.main'
                  gutterBottom
                  sx={{
                    fontSize: '2rem',
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
                  display='flex'
                  alignItems='center'
                  variant='subtitle1'
                  color='accent.main'
                  sx={{
                    fontStyle: 'italic'
                  }}>
                  <LocalShippingIcon />
                  Delivery Address
                </Typography>
                <Typography
                  variant='h4'
                  color='accent.main'
                  gutterBottom
                  sx={{
                    fontSize: '2rem',
                    textAlign: { xs: 'center', md: 'left' }
                  }}>
                  {selectedContact.deliveryAddress}
                </Typography>
              </Box>
            </Box>
            {selectedContact.phoneNumbers.length > 0 && (
              <Divider
                sx={{
                  mb: { xs: 3, md: 5 }
                }}>
                <Chip label='Phone Numbers' color='accent' />
              </Divider>
            )}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                justifyContent: 'flex-start',
                gap: { xs: 2, md: 2 },
                mb: { xs: 3, md: 4 }
              }}>
              {selectedContact.phoneNumbers.length > 0 &&
                selectedContact.phoneNumbers.map((phoneNumber) => {
                  return (
                    <Box
                      key={phoneNumber.id}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: { xs: 'center', md: 'flex-start' },
                        justifyContent: 'flex-start'
                      }}>
                      <Typography
                        display='flex'
                        variant='subtitle1'
                        color='accent.main'
                        sx={{
                          fontStyle: 'italic'
                        }}>
                        {phoneNumber.label === 'Mobile' && <SmartphoneIcon />}
                        {phoneNumber.label === 'Home' && <HomeIcon />}
                        {phoneNumber.label === 'Work' && <WorkIcon />}
                        {phoneNumber.label}
                      </Typography>
                      <Typography
                        variant='h4'
                        color='accent.main'
                        gutterBottom
                        sx={{
                          fontSize: '2rem',
                          textAlign: { xs: 'center', md: 'left' }
                        }}>
                        {phoneNumber.contactNumber}
                      </Typography>
                    </Box>
                  );
                })}
            </Box>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default ContactDetails;
