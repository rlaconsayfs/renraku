import axios from 'axios';
import { USER_URL } from './ApiConstants';

export const getUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const response = await axios.get(`${USER_URL}currentUser`, config);

    if (response.status === 200) {
      console.log(response);
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
