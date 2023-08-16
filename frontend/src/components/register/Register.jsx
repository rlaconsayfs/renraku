import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { checkUsernameExists, register } from '../../apis/Auth';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Copyright from '../copyright/Copyright';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import MuiAlert from '@mui/material/Alert';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Register = () => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [emailAddressError, setEmailAddressError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);
  const [registerDisabled, setRegisterDisabled] = useState(false);
  const [loaderVisibility, setLoaderVisibility] = useState(false);
  const [snackBarOpenSuccess, setSnackBarOpenSuccess] = useState(false);
  const [snackBarOpenError, setSnackBarOpenError] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameExists(false);
    const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+|\s+|null/gi;
    setUsernameError(regex.test(event.target.value));
  };

  const handleUsernameCheck = async (event) => {
    if (!(event.target.value.length === 0)) {
      const usernameExists = await checkUsernameExists(event.target.value);
      setUsernameExists(usernameExists);
    }
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !usernameError &&
      !usernameExists &&
      firstName &&
      lastName &&
      !emailAddressError &&
      !passwordError &&
      !passwordConfirmError
    ) {
      try {
        setRegisterDisabled(true);
        setLoaderVisibility(true);
        const response = await register({
          username,
          firstName,
          lastName,
          emailAddress,
          password
        });
        console.log(response);
        if (response.status === 201) {
          console.log('Registration successful');
          setSnackBarOpenSuccess(true);
          clearFields();
        }
      } catch (error) {
        console.log(error);
        setSnackBarOpenError(true);
      } finally {
        setRegisterDisabled(false);
        setLoaderVisibility(false);
      }
    }
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpenSuccess(false);
    setSnackBarOpenError(false);
  };

  const clearFields = () => {
    setUsername('');
    setUsernameError(false);
    setUsernameExists(false);
    setFirstName('');
    setLastName('');
    setEmailAddress('');
    setEmailAddressError(false);
    setPassword('');
    setPasswordError(false);
    setPasswordConfirm('');
    setPasswordConfirmError(false);
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
                onBlur={handleUsernameCheck}
                value={username}
                color='accent'
                required
                fullWidth
                id='username-register'
                name='username-register'
                label='Username'
                autoFocus
                error={usernameError || usernameExists}
                InputProps={{ ...turnOffAutocomplete }}
              />
              {usernameError && (
                <FormHelperText error>
                  {usernameError &&
                    'Username must not contain special characters'}
                </FormHelperText>
              )}
              {usernameExists && (
                <FormHelperText error>
                  {usernameExists && 'Username already exists'}
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleFirstNameChange}
                value={firstName}
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
                value={lastName}
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
                value={emailAddress}
                color='accent'
                required
                fullWidth
                id='email-register'
                name='email-register'
                label='Email Address'
                type='email'
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
                value={password}
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
                value={passwordConfirm}
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
            onClick={handleSubmit}
            color='accent'
            type='submit'
            fullWidth
            variant='contained'
            size='large'
            disabled={
              usernameError ||
              usernameExists ||
              emailAddressError ||
              passwordError ||
              passwordConfirmError ||
              !username ||
              !emailAddress ||
              !password ||
              !passwordConfirm ||
              !firstName ||
              !lastName ||
              registerDisabled
            }
            sx={{ mt: 3 }}>
            Register
          </Button>
          <LinearProgress
            sx={{ mt: 1, visibility: loaderVisibility ? 'visible' : 'hidden' }}
          />
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
      <Snackbar
        open={snackBarOpenSuccess}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Registered Successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackBarOpenError}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          There seems to be a problem. Please try again later.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
