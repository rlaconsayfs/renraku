import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Copyright from '../copyright/Copyright';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import LinearProgress from '@mui/material/LinearProgress';

const Register = () => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [emailAddressError, setEmailAddressError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+|\s+|null/gi;
    setUsernameError(regex.test(event.target.value));
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailAddressChange = (event) => {
    setEmailAddress(event.target.value);
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    setEmailAddressError(!regex.test(event.target.value));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(event.target.value.length < 8);
  };

  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
    setPasswordConfirmError(event.target.value !== password);
  };

  const turnOffAutocomplete = {
    autoComplete: 'new-password' // disable autocomplete and autofill
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <SettingsAccessibilityIcon />
        </Avatar>
        <Typography
          component='h1'
          variant='h4'
          sx={{
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: 10
          }}>
          Register
        </Typography>
        <Box component='form' noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={handleUsernameChange}
                color='accent'
                required
                fullWidth
                id='username-register'
                name='username-register'
                label='Username'
                autoFocus
                error={usernameError}
                InputProps={{ ...turnOffAutocomplete }}
              />
              {usernameError && (
                <FormHelperText error>
                  {usernameError &&
                    'Username must not contain special characters'}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleFirstNameChange}
                color='accent'
                required
                fullWidth
                id='firstName'
                name='firstName'
                label='First Name'
                InputProps={{ ...turnOffAutocomplete }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleLastNameChange}
                color='accent'
                required
                fullWidth
                id='lastName'
                name='lastName'
                label='Last Name'
                InputProps={{ ...turnOffAutocomplete }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleEmailAddressChange}
                color='accent'
                required
                fullWidth
                id='email-register'
                name='email-register'
                label='Email Address'
                error={emailAddressError}
                InputProps={{ ...turnOffAutocomplete }}
              />
              {emailAddressError && (
                <FormHelperText error>
                  {emailAddressError && 'Please enter a valid email address'}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handlePasswordChange}
                color='accent'
                required
                fullWidth
                id='password-register'
                name='password-register'
                label='Password'
                type='password'
                error={passwordError}
                InputProps={{ ...turnOffAutocomplete }}
              />
              {passwordError && (
                <FormHelperText error>
                  {passwordError &&
                    'Password must be at least 8 characters long'}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handlePasswordConfirmChange}
                color='accent'
                required
                fullWidth
                id='password-confirm-register'
                name='password-confirm-register'
                label='Confirm Password'
                type='password'
                error={passwordConfirmError}
                disabled={passwordError || !password}
                InputProps={{ ...turnOffAutocomplete }}
              />
              {passwordConfirmError && (
                <FormHelperText error>
                  {passwordConfirmError && 'Passwords do not match'}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
          <Button
            color='accent'
            type='submit'
            fullWidth
            variant='contained'
            size='large'
            disabled={
              usernameError ||
              emailAddressError ||
              passwordError ||
              passwordConfirmError ||
              !username ||
              !emailAddress ||
              !password ||
              !passwordConfirm ||
              !firstName ||
              !lastName
            }
            sx={{ mt: 3 }}>
            Register
          </Button>
          <Divider sx={{ color: 'accent.main', my: 3 }}>or</Divider>
          <Typography>
            Already have an account?{' '}
            <Link
              component={RouterLink}
              to='/login'
              color='accent.main'
              underline='hover'>
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Register;
