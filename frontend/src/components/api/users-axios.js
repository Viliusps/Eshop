import axios from 'axios';
import authHeader from '../../services/auth-header';
// eslint-disable-next-line no-undef
const URL = process.env.REACT_APP_API_URL;

export const getAllUsers = async () => {
  const response = await axios.get(URL + `/users`, authHeader());
  return response.data;
};

export const getUser = async (index) => {
  const response = await axios.get(URL + `/users/${index}`, authHeader());
  return response.data;
};

export const updateUser = async (index, username, email, phone, password) => {
  try {
    const response = await axios.put(
      URL + `/users/${index}`,
      {
        username: username,
        email: email,
        phone: phone,
        password: password
      },
      authHeader()
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
    return [];
  }
};

export const adminUpdateUser = async (index, username, email, phone, password, role) => {
  try {
    const response = await axios.put(
      URL + `/users/admin/${index}`,
      {
        username: username,
        email: email,
        phone: phone,
        password: password,
        role: role
      },
      authHeader()
    );
    return response.data;
  } catch (err) {
    console.error(err.message);
    return [];
  }
};

export const deleteUser = async (index) => {
  try {
    const response = await axios.delete(URL + `/users/${index}`, authHeader());
    return response.data;
  } catch (err) {
    console.error(err.message);
    return [];
  }
};

export const getRole = async () => {
  try {
    const token = localStorage.getItem('token');
    if (token != null) {
      const response = await axios.post(
        'http://localhost:8080/api/v1/users/decode',
        token,
        authHeader()
      );
      return response.data;
    } else return 'GUEST';
  } catch {
    //Token has expired, logging out
    localStorage.clear();
    return 'GUEST';
  }
};

export const getID = async () => {
  try {
    const token = localStorage.getItem('token');
    if (token != null) {
      const response = await axios.post(
        'http://localhost:8080/api/v1/users/getId',
        token,
        authHeader()
      );
      return response.data;
    } else return 'GUEST';
  } catch {
    //Token has expired, logging out
    localStorage.clear();
    return 'GUEST';
  }
};
