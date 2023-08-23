import React, { useState } from 'react';
import { createContact } from '../../../apis/Contacts';
import useTitle from '../../../hooks/useTitle';

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
import FemaleIcon from '@mui/icons-material/Female';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import HandshakeIcon from '@mui/icons-material/Handshake';
import LinearProgress from '@mui/material/LinearProgress';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MaleIcon from '@mui/icons-material/Male';
import MuiAlert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import PhoneNumberForm from './PhoneNumberForm';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const ContactsCreate = () => {
  useTitle('Create');

  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameMinError, setFirstNameMinError] = useState(false);
  const [firstNameMaxError, setFirstNameMaxError] = useState(false);
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameMinError, setLastNameMinError] = useState(false);
  const [lastNameMaxError, setLastNameMaxError] = useState(false);
  const [relationship, setRelationship] = useState('');
  const [relationshipError, setRelationshipError] = useState(false);
  const [relationshipMaxError, setRelationshipMaxError] = useState(false);
  const [gender, setGender] = useState('Male');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryAddressError, setDeliveryAddressError] = useState(false);
  const [deliveryAddressMaxError, setDeliveryAddressMaxError] = useState(false);
  const [billingAddress, setBillingAddress] = useState('');
  const [billingAddressError, setBillingAddressError] = useState(false);
  const [billingAddressMaxError, setBillingAddressMaxError] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [emailAddressError, setEmailAddressError] = useState(false);
  const [emailAddressMaxError, setEmailAddressMaxError] = useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState([
    {
      contactNumber: '',
      label: 'Mobile'
    }
  ]);
  const [createDisabled, setCreateDisabled] = useState(false);
  const [loaderVisibility, setLoaderVisibility] = useState(false);
  const [snackBarOpenSuccess, setSnackBarOpenSuccess] = useState(false);
  const [snackBarOpenError, setSnackBarOpenError] = useState(false);

  const handleFirstNameChange = (event) => {
    if (firstNameError) {
      setFirstNameError(false);
    }
    if (event.target.value.length < 2) {
      setFirstNameMinError(true);
    } else {
      setFirstNameMinError(false);
    }
    if (event.target.value.length > 50) {
      setFirstNameMaxError(true);
    } else {
      setFirstNameMaxError(false);
    }
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    if (lastNameError) {
      setLastNameError(false);
    }
    if (event.target.value.length < 2) {
      setLastNameMinError(true);
    } else {
      setLastNameMinError(false);
    }
    if (event.target.value.length > 50) {
      setLastNameMaxError(true);
    } else {
      setLastNameMaxError(false);
    }
    setLastName(event.target.value);
  };

  const handleRelationshipChange = (event) => {
    if (relationshipError) {
      setRelationshipError(false);
    }
    if (event.target.value.length > 50) {
      setRelationshipMaxError(true);
    } else {
      setRelationshipMaxError(false);
    }
    setRelationship(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleDeliveryAddressChange = (event) => {
    if (deliveryAddressError) {
      setDeliveryAddressError(false);
    }
    if (event.target.value.length > 200) {
      setDeliveryAddressMaxError(true);
    } else {
      setDeliveryAddressMaxError(false);
    }
    setDeliveryAddress(event.target.value);
  };

  const handleBillingAddressChange = (event) => {
    if (billingAddressError) {
      setBillingAddressError(false);
    }
    if (event.target.value.length > 200) {
      setBillingAddressMaxError(true);
    } else {
      setBillingAddressMaxError(false);
    }
    setBillingAddress(event.target.value);
  };

  const handleEmailAddressChange = (event) => {
    if (event.target.value.length > 100) {
      setEmailAddressMaxError(true);
    } else {
      setEmailAddressMaxError(false);
    }
    setEmailAddress(event.target.value);
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    setEmailAddressError(!regex.test(event.target.value));
  };

  const handleAddPhoneNumber = (event) => {
    setPhoneNumbers([
      ...phoneNumbers,
      {
        contactNumber: '',
        label: 'Mobile'
      }
    ]);

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 1);
  };

  const handleRemovePhoneNumber = (_, indexToRemove) => {
    if (phoneNumbers.length === 1) {
      setPhoneNumbers([
        {
          contactNumber: '',
          label: 'Mobile'
        }
      ]);
    } else {
      const filtered = phoneNumbers.filter(
        (phoneNumber, index) => index !== indexToRemove
      );
      setPhoneNumbers(filtered);
    }
  };

  const handleContactNumberChange = (event, indexToChange) => {
    const digitsRegex = /^[0-9]+$/;
    const { value } = event.target;

    // Ensure the value is composed of digits and has a length of at most 15
    if ((digitsRegex.test(value) || value === '') && value.length <= 15) {
      const updatedPhoneNumbers = [...phoneNumbers];
      updatedPhoneNumbers[indexToChange].contactNumber = value;
      setPhoneNumbers(updatedPhoneNumbers);
    }
  };

  const handleLabelChange = (event, indexToChange) => {
    const updatedPhoneNumbers = [...phoneNumbers];
    updatedPhoneNumbers[indexToChange].label = event.target.value;
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const check = checkFieldErrors();
    if (!check) {
      try {
        const token = sessionStorage.getItem('token');
        setCreateDisabled(true);
        setLoaderVisibility(true);
        const response = await createContact(token, {
          firstName,
          lastName,
          relationship,
          gender,
          deliveryAddress,
          billingAddress,
          emailAddress,
          phoneNumbers
        });
        if (response.status === 201) {
          setSnackBarOpenSuccess(true);
          clearFields();
        }
      } catch (error) {
        setSnackBarOpenError(true);
      } finally {
        setCreateDisabled(false);
        setLoaderVisibility(false);
      }
    }
  };

  const handleClear = (event) => {
    event.preventDefault();
    clearFields();
  };

  const checkFieldErrors = () => {
    let flag = false;
    if (!firstName) {
      setFirstNameError(true);
      flag = true;
    }
    if (firstNameMinError || firstNameMaxError) {
      flag = true;
    }
    if (!lastName) {
      setLastNameError(true);
      flag = true;
    }
    if (lastNameMinError || lastNameMaxError) {
      flag = true;
    }
    if (!relationship) {
      setRelationshipError(true);
      flag = true;
    }
    if (relationshipMaxError) {
      flag = true;
    }
    if (!deliveryAddress) {
      setDeliveryAddressError(true);
      flag = true;
    }
    if (deliveryAddressMaxError) {
      flag = true;
    }
    if (!billingAddress) {
      setBillingAddressError(true);
      flag = true;
    }
    if (billingAddressMaxError) {
      flag = true;
    }
    if (!emailAddress) {
      setEmailAddressError(true);
      flag = true;
    }
    if (emailAddressMaxError) {
      flag = true;
    }
    return flag;
  };

  const clearFields = () => {
    setFirstName('');
    setLastName('');
    setRelationship('');
    setGender('Male');
    setDeliveryAddress('');
    setBillingAddress('');
    setEmailAddress('');
    setPhoneNumbers([
      {
        contactNumber: '',
        label: 'Mobile'
      }
    ]);
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
                    value={firstName}
                    onChange={handleFirstNameChange}
                    color='accent'
                    required
                    fullWidth
                    id='firstname'
                    name='firstname'
                    label='First Name'
                    autoFocus
                    error={
                      firstNameError || firstNameMinError || firstNameMaxError
                    }
                    InputProps={{ ...turnOffAutocomplete }}
                  />
                </Box>
                {firstNameMinError && (
                  <FormHelperText error>
                    First name must be at least 2 characters long
                  </FormHelperText>
                )}
                {firstNameMaxError && (
                  <FormHelperText error>
                    First name must be less than 50 characters long
                  </FormHelperText>
                )}
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
                    value={lastName}
                    onChange={handleLastNameChange}
                    color='accent'
                    required
                    fullWidth
                    id='lastname'
                    name='lastname'
                    label='Last Name'
                    error={
                      lastNameError || lastNameMinError || lastNameMaxError
                    }
                    InputProps={{ ...turnOffAutocomplete }}
                  />
                </Box>
                {lastNameMinError && (
                  <FormHelperText error>
                    Last name must be at least 2 characters long
                  </FormHelperText>
                )}
                {lastNameMaxError && (
                  <FormHelperText error>
                    Last name must be less than 50 characters long
                  </FormHelperText>
                )}
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
                    value={relationship}
                    onChange={handleRelationshipChange}
                    color='accent'
                    required
                    fullWidth
                    id='relationship'
                    name='relationship'
                    label='Relationship'
                    error={relationshipError || relationshipMaxError}
                    InputProps={{ ...turnOffAutocomplete }}
                  />
                </Box>
                {relationshipMaxError && (
                  <FormHelperText error>
                    Relationship must be less than 50 characters long
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  {gender === 'Male' ? (
                    <MaleIcon color='accent' fontSize='large' sx={{ mr: 2 }} />
                  ) : (
                    <FemaleIcon
                      color='accent'
                      fontSize='large'
                      sx={{ mr: 2 }}
                    />
                  )}
                  <FormControl>
                    <FormLabel color='accent'>Gender</FormLabel>
                    <RadioGroup value={gender} onChange={handleGenderChange}>
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
                    value={deliveryAddress}
                    onChange={handleDeliveryAddressChange}
                    color='accent'
                    required
                    multiline
                    fullWidth
                    id='deliveryaddress'
                    name='deliveryaddress'
                    label='Delivery Address'
                    error={deliveryAddressError || deliveryAddressMaxError}
                    InputProps={{ ...turnOffAutocomplete }}
                  />
                </Box>
                {deliveryAddressMaxError && (
                  <FormHelperText error>
                    Delivery address must be less than 200 characters long
                  </FormHelperText>
                )}
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
                    value={billingAddress}
                    onChange={handleBillingAddressChange}
                    color='accent'
                    required
                    multiline
                    fullWidth
                    id='billingaddress'
                    name='billingaddress'
                    label='Billing Address'
                    error={billingAddressError || billingAddressMaxError}
                    InputProps={{ ...turnOffAutocomplete }}
                  />
                </Box>
                {billingAddressMaxError && (
                  <FormHelperText error>
                    Billing address must be less than 200 characters long
                  </FormHelperText>
                )}
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
                    value={emailAddress}
                    onChange={handleEmailAddressChange}
                    color='accent'
                    required
                    fullWidth
                    id='emailaddress'
                    name='emailaddress'
                    label='Email Address'
                    type='email'
                    error={emailAddressError || emailAddressMaxError}
                    InputProps={{ ...turnOffAutocomplete }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  {emailAddressError && (
                    <>
                      <EmailIcon
                        color='accent'
                        fontSize='large'
                        sx={{ mr: 2, visibility: 'hidden' }}
                      />
                      <FormHelperText error>
                        Please enter a valid email address
                      </FormHelperText>
                    </>
                  )}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  {emailAddressMaxError && (
                    <>
                      <EmailIcon
                        color='accent'
                        fontSize='large'
                        sx={{ mr: 2, visibility: 'hidden' }}
                      />
                      <FormHelperText error>
                        Email address must be less than 100 characters long
                      </FormHelperText>
                    </>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Divider textAlign='left'>
                  <Chip label='Phone Numbers' color='accent'></Chip>
                </Divider>
              </Grid>

              {phoneNumbers.map((phoneNumber, index) => {
                return (
                  <Grid item xs={12} key={index}>
                    <PhoneNumberForm
                      index={index}
                      phoneNumber={phoneNumber}
                      handleContactNumberChange={handleContactNumberChange}
                      handleLabelChange={handleLabelChange}
                      handleRemovePhoneNumber={handleRemovePhoneNumber}
                      turnOffAutocomplete={turnOffAutocomplete}
                    />
                    <Divider sx={{ mt: 2 }} />
                  </Grid>
                );
              })}

              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                  <Button
                    onClick={handleAddPhoneNumber}
                    variant='outlined'
                    size='small'
                    color='accent'
                    disabled={phoneNumbers.some(
                      (phoneNumber) => !phoneNumber.contactNumber
                    )}
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
                    onClick={handleSubmit}
                    type='submit'
                    size='large'
                    variant='contained'
                    color='accent'
                    disabled={createDisabled}
                    startIcon={<CheckIcon />}>
                    Create
                  </Button>
                  <Button
                    onClick={handleClear}
                    type='reset'
                    variant='standard'
                    color='error'
                    sx={{ color: 'error.main' }}
                    startIcon={<CloseIcon />}>
                    Clear
                  </Button>
                </Box>
                <LinearProgress
                  sx={{
                    mt: 1,
                    visibility: loaderVisibility ? 'visible' : 'hidden'
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
      <Snackbar
        open={snackBarOpenSuccess}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Created Successfully!
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

export default ContactsCreate;
