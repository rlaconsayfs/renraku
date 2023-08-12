import axios from 'axios';
import { AUTH_URL } from './ApiConstants';

export const login = async (username, password) => {
  try {
    const response = await axios.post(AUTH_URL + 'login', {
      username: username,
      password: password
    });

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
