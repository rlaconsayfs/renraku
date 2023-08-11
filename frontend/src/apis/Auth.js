import axios from 'axios';

const API_URL = 'https://localhost:7295/api/auth/';

export const login = (username, password) => {
  return axios
    .post(API_URL + 'login', {
      username: username,
      password: password
    })
    .then((response) => {      
        console.log(response.data);
      return response.data;
    });
};
