import axios from 'axios';
const URL = process.env.REACT_APP_API_URL;

export const getLocations = async () => {
  const response = await axios.get(URL + `/locations`);
  return response.data;
};
