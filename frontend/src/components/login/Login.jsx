import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Copyright from '../copyright/Copyright';

const Login = () => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError(event.target.value.length === 0);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(event.target.value.length === 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUsernameError(username.length === 0);
    setPasswordError(password.length === 0);
    if (username.length > 0 && password.length > 0) {
      console.log('Login successful!');
    }
  };

  return (
    <Container component='main' maxWidth='sx'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockIcon />
        </Avatar>

        <Typography
          component='h1'
          variant='h4'
          sx={{
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: 10,
          }}>
          Login
        </Typography>

        <Box component='form' noValidate autoComplete='off' sx={{ mt: 1 }}>
          <TextField
            onChange={handleUsernameChange}
            color='accent'
            margin='normal'
            fullWidth
            id='username-login'
            name='username-login'
            label='Username'
            autoFocus
            error={usernameError}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            onChange={handlePasswordChange}
            color='accent'
            margin='normal'
            fullWidth
            id='password-login'
            name='password-login'
            label='Password'
            type='password'
            error={passwordError}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            onClick={handleSubmit}
            color='accent'
            type='submit'
            fullWidth
            variant='contained'
            size='large'
            sx={{ mt: 3 }}>
            Login
          </Button>
          <Divider sx={{ color: 'accent.main', my: 3 }}>or</Divider>
          <Typography>
            Don't have an account?{' '}
            <Link component={RouterLink} to='/register' color='accent.main' underline='hover'>
              Register
            </Link>
          </Typography>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Login;
