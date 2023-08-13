import axios from 'axios';
import { AUTH_URL } from './ApiConstants';
import { USER_URL } from './ApiConstants';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${AUTH_URL}login`, {
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
      if(error.code === 'ERR_NETWORK') { throw new Error('Network error'); }
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

export const register = async (registerDetails) => {
  const {
    username,
    password,
    firstName,
    lastName,
    emailAddress: email
  } = registerDetails;
  try {
    const response = await axios.post(`${AUTH_URL}register`, {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      email: email
    });

    if (response.status === 201) {
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
          throw new Error('Invalid username or password');
        case 500:
          throw new Error('Server error');
        default:
          throw new Error('Unexpected error occurred');
      }
    }
  }
};

export const checkUsernameExists = async (username) => {
  try {
    const response = await axios.get(
      `${USER_URL}checkUsername?username=${username}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.log('Received unexpected status code:', response.status);
      throw new Error('Unexpected error occurred');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const response = error.response;
      switch (response.status) {
        case 500:
          throw new Error('Server error');
        default:
          throw new Error('Unexpected error occurred');
      }
    }
  }
};
