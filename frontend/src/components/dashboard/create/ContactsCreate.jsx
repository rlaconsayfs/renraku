import React from 'react';

import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import BadgeIcon from '@mui/icons-material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import EmailIcon from '@mui/icons-material/Email';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import HandshakeIcon from '@mui/icons-material/Handshake';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Paper from '@mui/material/Paper';
import PhoneNumberForm from './PhoneNumberForm';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import ReceiptIcon from '@mui/icons-material/Receipt';
import TextField from '@mui/material/TextField';
import TransgenderIcon from '@mui/icons-material/Transgender';
import Typography from '@mui/material/Typography';

const ContactsCreate = () => {
  const turnOffAutocomplete = {
    autoComplete: 'new-password' // disable autocomplete and autofill
  };

  return (
    <Container>
      <Paper
        variant='outlined'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'secondary.main',
          borderColor: 'accent.main'
        }}>
        <Box sx={{ m: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant='h4' color='accent.main'>
              Create a new contact
            </Typography>
          </Box>
          <Box component='form' autoComplete='off' noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Divider textAlign='left'>
                  <Chip label='Basic Details' color='accent'></Chip>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <BadgeIcon color='accent' fontSize='large' sx={{ mr: 2 }} />
                  <TextField
                    // onChange={handleUsernameChange}
                    color='accent'
                    required
                    fullWidth
                    id='firstname'
                    name='firstname'
                    label='First Name'
                    autoFocus
                    // error={usernameError}
                    InputProps={{ ...turnOffAutocomplete }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <BadgeIcon
                    color='accent'
                    fontSize='large'
                    sx={{ mr: 2, visibility: 'hidden' }}
                  />
                  <TextField
                    // onChange={handleUsernameChange}
                    color='accent'
                    required
                    fullWidth
                    id='lastname'
                    name='lastname'
                    label='Last Name'
                    // error={usernameError}
                    InputProps={{ ...turnOffAutocomplete }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <HandshakeIcon
                    color='accent'
                    fontSize='large'
                    sx={{ mr: 2 }}
                  />
                  <TextField
                    // onChange={handleUsernameChange}
                    color='accent'
                    required
                    fullWidth
                    id='relationship'
                    name='relationship'
                    label='Relationship'
                    // error={usernameError}
                    InputProps={{ ...turnOffAutocomplete }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <TransgenderIcon
                    color='accent'
                    fontSize='large'
                    sx={{ mr: 2 }}
                  />
                  <FormControl>
                    <FormLabel color='accent'>Gender</FormLabel>
                    <RadioGroup>
                      {' '}
                      {/* add value = {category} onChange={(e) => setCategory} */}
                      <FormControlLabel
                        value='Male'
                        control={<Radio color='accent' />}
                        label='Male'
                      />
                      <FormControlLabel
                        value='Female'
                        control={<Radio color='accent' />}
                        label='Female'
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Divider textAlign='left'>
                  <Chip label='Addresses' color='accent'></Chip>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <LocalShippingIcon
                    color='accent'
                    fontSize='large'
                    sx={{ mr: 2 }}
                  />
                  <TextField
                    // onChange={handleUsernameChange}
                    color='accent'
                    required
                    fullWidth
                    id='deliveryaddress'
                    name='deliveryaddress'
                    label='Delivery Address'
                    // error={usernameError}
                    InputProps={{ ...turnOffAutocomplete }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <ReceiptIcon color='accent' fontSize='large' sx={{ mr: 2 }} />
                  <TextField
                    // onChange={handleUsernameChange}
                    color='accent'
                    required
                    fullWidth
                    id='billingaddress'
                    name='billingaddress'
                    label='Billing Address'
                    // error={usernameError}
                    InputProps={{ ...turnOffAutocomplete }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <EmailIcon color='accent' fontSize='large' sx={{ mr: 2 }} />
                  <TextField
                    // onChange={handleUsernameChange}
                    color='accent'
                    required
                    fullWidth
                    id='emailaddress'
                    name='emailaddress'
                    label='Email Address'
                    type='email'
                    // error={usernameError}
                    InputProps={{ ...turnOffAutocomplete }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Divider textAlign='left'>
                  <Chip label='Phone Numbers' color='accent'></Chip>
                </Divider>
              </Grid>
              <Grid item xs={12}>
                <PhoneNumberForm turnOffAutocomplete={turnOffAutocomplete} />
                <Divider sx={{ mt: 2 }} />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <Button
                    variant='outlined'
                    size='small'
                    color='accent'
                    startIcon={<AddIcCallIcon />}>
                    Add a Phone Number
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2
                  }}>
                  <Button
                    type='submit'
                    size='large'
                    variant='contained'
                    color='accent'
                    startIcon={<CheckIcon />}>
                    Create
                  </Button>
                  <Button
                    variant='standard'
                    color='error'
                    sx={{ color: 'error.main' }}
                    startIcon={<CloseIcon />}>
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ContactsCreate;
