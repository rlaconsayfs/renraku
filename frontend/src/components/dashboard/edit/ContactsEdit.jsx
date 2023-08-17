import React, { useEffect, useState } from 'react';
import { updateContact, deleteContact } from '../../../apis/Contacts';
import useTitle from '../../../hooks/useTitle';
import PhoneNumberForm from '../create/PhoneNumberForm';
import { useNavigate, useLocation } from 'react-router-dom';
import ContactsEditSkeleton from './ContactsEditSkeleton';
import DeleteDialog from '../../delete/DeleteDialog';

import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import BadgeIcon from '@mui/icons-material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const ContactsEdit = () => {
  useTitle('Edit Contact');
  const location = useLocation();
  const navigate = useNavigate();

  const [contact, setContact] = useState({});
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState(false);
  const [relationship, setRelationship] = useState('');
  const [relationshipError, setRelationshipError] = useState(false);
  const [gender, setGender] = useState('Male');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryAddressError, setDeliveryAddressError] = useState(false);
  const [billingAddress, setBillingAddress] = useState('');
  const [billingAddressError, setBillingAddressError] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [emailAddressError, setEmailAddressError] = useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState([
    {
      id: 0,
      contactNumber: '',
      label: 'Mobile'
    }
  ]);
  const [createDisabled, setUpdateDisabled] = useState(false);
  const [loaderVisibility, setLoaderVisibility] = useState(false);
  const [snackBarOpenSuccess, setSnackBarOpenSuccess] = useState(false);
  const [snackBarOpenError, setSnackBarOpenError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      setData(location.state.selectedContact);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    if (firstNameError) {
      setFirstNameError(false);
    }
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    if (lastNameError) {
      setLastNameError(false);
    }
  };

  const handleRelationshipChange = (event) => {
    setRelationship(event.target.value);
    if (relationshipError) {
      setRelationshipError(false);
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleDeliveryAddressChange = (event) => {
    setDeliveryAddress(event.target.value);
    if (deliveryAddressError) {
      setDeliveryAddressError(false);
    }
  };

  const handleBillingAddressChange = (event) => {
    setBillingAddress(event.target.value);
    if (billingAddressError) {
      setBillingAddressError(false);
    }
  };

  const handleEmailAddressChange = (event) => {
    setEmailAddress(event.target.value);
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    setEmailAddressError(!regex.test(event.target.value));
  };

  const handleAddPhoneNumber = (event) => {
    setPhoneNumbers([
      ...phoneNumbers,
      {
        id: 0,
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
          id: 0,
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
    if (digitsRegex.test(value) || value === '') {
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
    const check = checkEmptyErrors();
    if (!check) {
      try {
        const token = sessionStorage.getItem('token');
        setUpdateDisabled(true);
        setLoaderVisibility(true);
        const response = await updateContact(token, contact.id, {
          firstName,
          lastName,
          relationship,
          gender,
          deliveryAddress,
          billingAddress,
          emailAddress,
          phoneNumbers
        });
        if (response.status === 200) {
          console.log('Create successful');
          setSnackBarOpenSuccess(true);
          clearFields();
          setTimeout(() => {
            navigate(`/contacts/${contact.id}`);
          }, 2000);
        }
      } catch (error) {
        setSnackBarOpenError(true);
      } finally {
        setUpdateDisabled(false);
        setLoaderVisibility(false);
      }
    }
  };

  const handleDialogDelete = async (event) => {
    event.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      setUpdateDisabled(true);
      setLoaderVisibility(true);
      const response = await deleteContact(token, contact.id);
      if (response.status === 200) {
        console.log('Delete successful');
        navigate('/');
      }
    } catch (error) {
      setSnackBarOpenError(true);
    } finally {
      setUpdateDisabled(false);
      setLoaderVisibility(false);
    }
  };

  const handleClear = (event) => {
    event.preventDefault();
    clearFields();
  };

  const checkEmptyErrors = () => {
    let flag = false;
    if (!firstName) {
      setFirstNameError(true);
      flag = true;
    }
    if (!lastName) {
      setLastNameError(true);
      flag = true;
    }
    if (!relationship) {
      setRelationshipError(true);
      flag = true;
    }
    if (!deliveryAddress) {
      setDeliveryAddressError(true);
      flag = true;
    }
    if (!billingAddress) {
      setBillingAddressError(true);
      flag = true;
    }
    if (!emailAddress) {
      setEmailAddressError(true);
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
        id: 0,
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

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const turnOffAutocomplete = {
    autoComplete: 'new-password' // disable autocomplete and autofill
  };

  const setData = (data) => {
    setContact(data);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setRelationship(data.relationship);
    setGender(data.gender);
    setDeliveryAddress(data.deliveryAddress);
    setBillingAddress(data.billingAddress);
    setEmailAddress(data.emailAddress);
    if (!(data.phoneNumbers.length === 0)) {
      setPhoneNumbers(data.phoneNumbers);
    }
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
        {isLoading ? (
          <ContactsEditSkeleton />
        ) : (
          <Box sx={{ m: 3 }}>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Typography
                variant='h4'
                color='accent.main'
                sx={{
                  flexGrow: 1
                }}>
                Updating {contact.firstName}
              </Typography>
              <Button
                onClick={handleClickOpen}
                color='error'
                variant='outlined'
                startIcon={<DeleteIcon />}>
                Delete
              </Button>
              {openDialog && (
                <DeleteDialog
                  firstName={firstName}
                  open={openDialog}
                  handleClose={handleDialogClose}
                  handleDelete={handleDialogDelete}
                />
              )}
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
                      error={firstNameError}
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
                      value={lastName}
                      onChange={handleLastNameChange}
                      color='accent'
                      required
                      fullWidth
                      id='lastname'
                      name='lastname'
                      label='Last Name'
                      error={lastNameError}
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
                      value={relationship}
                      onChange={handleRelationshipChange}
                      color='accent'
                      required
                      fullWidth
                      id='relationship'
                      name='relationship'
                      label='Relationship'
                      error={relationshipError}
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
                    {gender === 'Male' ? (
                      <MaleIcon
                        color='accent'
                        fontSize='large'
                        sx={{ mr: 2 }}
                      />
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
                      fullWidth
                      id='deliveryaddress'
                      name='deliveryaddress'
                      label='Delivery Address'
                      error={deliveryAddressError}
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
                    <ReceiptIcon
                      color='accent'
                      fontSize='large'
                      sx={{ mr: 2 }}
                    />
                    <TextField
                      value={billingAddress}
                      onChange={handleBillingAddressChange}
                      color='accent'
                      required
                      fullWidth
                      id='billingaddress'
                      name='billingaddress'
                      label='Billing Address'
                      error={billingAddressError}
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
                      value={emailAddress}
                      onChange={handleEmailAddressChange}
                      color='accent'
                      required
                      fullWidth
                      id='emailaddress'
                      name='emailaddress'
                      label='Email Address'
                      type='email'
                      error={emailAddressError}
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
                      Update
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
        )}
      </Paper>
      <Snackbar
        open={snackBarOpenSuccess}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          Update Successful!
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

export default ContactsEdit;
