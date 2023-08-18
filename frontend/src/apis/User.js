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

export const updateUser = async (token, user) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const response = await axios.put(`${USER_URL}${user.id}`, user, config);

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

export const deleteUser = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    console.log(id)
    const response = await axios.delete(`${USER_URL}${id}`, config);
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
