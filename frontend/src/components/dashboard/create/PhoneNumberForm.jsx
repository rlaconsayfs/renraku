import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';
import InputLabel from '@mui/material/InputLabel';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MenuItem from '@mui/material/MenuItem';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import Select from '@mui/material/Select';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import TextField from '@mui/material/TextField';
import WorkIcon from '@mui/icons-material/Work';

const PhoneNumberForm = (props) => {
  const {
    index,
    phoneNumber,
    handleContactNumberChange,
    handleLabelChange,
    handleRemovePhoneNumber,
    turnOffAutocomplete
  } = props;

  const contactNumber = phoneNumber.contactNumber;
  const label = phoneNumber.label;

  const handleContactNumber = (e) => {
    handleContactNumberChange(e, index);
  };

  const handleLabel = (e) => {
    handleLabelChange(e, index);
  };

  const handleRemove = (e) => {
    handleRemovePhoneNumber(e, index);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <LocalPhoneIcon color='accent' fontSize='large' sx={{ mr: 2 }} />
          <TextField
            value={contactNumber}
            onChange={handleContactNumber}
            color='accent'
            required
            fullWidth
            id='phonenumber'
            name='phonenumber'
            label='Contact Number'
            type='tel'
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
          {label === 'Mobile' && (
            <SmartphoneIcon color='accent' fontSize='large' sx={{ mr: 2 }} />
          )}
          {label === 'Home' && (
            <HomeIcon color='accent' fontSize='large' sx={{ mr: 2 }} />
          )}
          {label === 'Work' && (
            <WorkIcon color='accent' fontSize='large' sx={{ mr: 2 }} />
          )}
          <FormControl fullWidth>
            <InputLabel color='accent'>Label</InputLabel>
            <Select
              value={label}
              onChange={handleLabel}
              color='accent'
              label='Label'
              MenuProps={{
                sx: {
                  '& .MuiMenu-paper': {
                    bgcolor: 'background.main'
                  }
                }
              }}>
              <MenuItem
                value='Mobile'
                sx={{
                  color: 'accent.main'
                }}>
                Mobile
              </MenuItem>
              <MenuItem
                value='Home'
                sx={{
                  color: 'accent.main'
                }}>
                Home
              </MenuItem>
              <MenuItem
                value='Work'
                sx={{
                  color: 'accent.main'
                }}>
                Work
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
          <Button
            onClick={(e) => handleRemove(e)}
            variant='outlined'
            size='small'
            color='error'
            startIcon={<PhoneDisabledIcon />}>
            Remove this number
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PhoneNumberForm;
