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
    } else {
      console.log('Received unexpected status code:', response.status);
      throw new Error('Unexpected error occurred');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const response = error.response;
      switch (response.status) {
        case 400:
        case 404:
          throw new Error('Invalid username or password');
        case 500:
          throw new Error('Server error');
        default:
          throw new Error('Unexpected error occurred');
      }
    }
  }
};
