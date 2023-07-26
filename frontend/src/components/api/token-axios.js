import axios from 'axios';
import authHeader from '../../services/auth-header';
const URL = process.env.REACT_APP_API_URL;

export const login = async (username, password) => {
  const resp = await axios.post(URL + '/auth/authenticate', {
    username: username,
    password: password
  });
  localStorage.setItem('token', resp.data.token);
  return resp.data;
};

export const register = async (username, email, phone, password) => {
  try {
    const resp = await axios.post(URL + '/auth/register', {
      username: username,
      email: email,
      phone: phone,
      password: password
    });
    return resp.data;
  } catch (err) {
    return '';
  }
};

export const refreshToken = async (username) => {
  const resp = await axios.post(
    URL + '/auth/refresh',
    {
      username: username
    },
    authHeader()
  );
  return resp.data;
};
