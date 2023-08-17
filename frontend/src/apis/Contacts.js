import axios from 'axios';
import { CONTACT_URL } from './ApiConstants';

export const getContacts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const response = await axios.get(`${CONTACT_URL}`, config);

    if (response.status === 200 || response.status === 204) {
      return response;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const response = error.response;
      switch (response.status) {
        case 401:
        case 403:
          throw new Error('Unauthorized / Forbidden');
        case 500:
          throw new Error('Server error');
        default:
          throw new Error('Unexpected error occurred');
      }
    }
  }
};

export const getContact = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const response = await axios.get(`${CONTACT_URL}${id}`, config);

    if (response.status === 200 || response.status === 204) {
      return response;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const response = error.response;
      switch (response.status) {
        case 400:
        case 403:
          throw new Error('Unauthorized / Forbidden');
        case 404:
          throw new Error('Not found');
        case 500:
          throw new Error('Server error');
        default:
          throw new Error('Unexpected error occurred');
      }
    }
  }
};

export const createContact = async (token, contact) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const {
    firstName,
    lastName,
    relationship,
    gender,
    deliveryAddress,
    billingAddress,
    emailAddress,
    phoneNumbers
  } = contact;

  /// Filter out phone numbers without contactNumber
  const validPhoneNumbers = phoneNumbers.filter(
    (phoneNumber) => phoneNumber.contactNumber !== ''
  );

  // If there are valid phone numbers, include them in the contact object
  if (validPhoneNumbers.length > 0) {
    contact = {
      firstName,
      lastName,
      relationship,
      gender,
      deliveryAddress,
      billingAddress,
      emailAddress,
      phoneNumbers: validPhoneNumbers
    };
  } else {
    // If no valid phone numbers, exclude phoneNumbers from the contact object
    contact = {
      firstName,
      lastName,
      relationship,
      gender,
      deliveryAddress,
      billingAddress,
      emailAddress
    };
  }

  try {
    const response = await axios.post(`${CONTACT_URL}`, contact, config);

    if (response.status === 201) {
      console.log(response);
      return response;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const response = error.response;
      switch (response.status) {
        case 400:
          throw new Error('Bad request');
        case 401:
        case 403:
          throw new Error('Unauthorized / Forbidden');
        case 500:
          throw new Error('Server error');
        default:
          throw new Error('Unexpected error occurred');
      }
    }
  }
};

export const patchContactIsFavorite = async (token, id, value) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json-patch+json'
    }
  };

  const request = [
    {
      op: 'replace',
      path: '/isFavorite',
      value: value
    }
  ];

  try {
    const response = await axios.patch(`${CONTACT_URL}${id}`, request, config);

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      const response = error.response;
      switch (response.status) {
        case 400:
          throw new Error('Bad request');
        case 401:
        case 403:
          throw new Error('Unauthorized / Forbidden');
        case 404:
          throw new Error('Not found');
        case 500:
          throw new Error('Server error');
        default:
          throw new Error('Unexpected error occurred');
      }
    }
  }
};

export const updateContact = async (token, id, contact) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const {
    firstName,
    lastName,
    relationship,
    gender,
    deliveryAddress,
    billingAddress,
    emailAddress,
    phoneNumbers
  } = contact;

  /// Filter out phone numbers without contactNumber
  const validPhoneNumbers = phoneNumbers.filter(
    (phoneNumber) => phoneNumber.contactNumber !== ''
  );

  // If there are valid phone numbers, include them in the contact object
  if (validPhoneNumbers.length > 0) {
    contact = {
      firstName,
      lastName,
      relationship,
      gender,
      deliveryAddress,
      billingAddress,
      emailAddress,
      phoneNumbers: validPhoneNumbers
    };
  } else {
    // If no valid phone numbers, exclude phoneNumbers from the contact object
    contact = {
      firstName,
      lastName,
      relationship,
      gender,
      deliveryAddress,
      billingAddress,
      emailAddress
    };
  }

  try {
    const response = await axios.put(`${CONTACT_URL}${id}`, contact, config);

    if (response.status === 200) {
      console.log(response);
      return response;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const response = error.response;
      switch (response.status) {
        case 400:
          throw new Error('Bad request');
        case 401:
        case 403:
          throw new Error('Unauthorized / Forbidden');
        case 500:
          throw new Error('Server error');
        default:
          throw new Error('Unexpected error occurred');
      }
    }
  }
};

export const deleteContact = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const response = await axios.delete(`${CONTACT_URL}${id}`, config);

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const response = error.response;
      switch (response.status) {
        case 401:
        case 403:
          throw new Error('Unauthorized / Forbidden');
        case 404:
          throw new Error('Not found');
        case 500:
          throw new Error('Server error');
        default:
          throw new Error('Unexpected error occurred');
      }
    }
  }
};
