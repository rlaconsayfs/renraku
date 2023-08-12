import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LabelIcon from '@mui/icons-material/Label';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import TextField from '@mui/material/TextField';

const PhoneNumberForm = (props) => {
  const { turnOffAutocomplete } = props;

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
            // onChange={handleUsernameChange}
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
          <LabelIcon color='accent' fontSize='large' sx={{ mr: 2 }} />
          <TextField
            // onChange={handleUsernameChange}
            color='accent'
            required
            fullWidth
            id='label'
            name='label'
            label='Label'
            // error={usernameError}
            InputProps={{ ...turnOffAutocomplete }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default PhoneNumberForm;
