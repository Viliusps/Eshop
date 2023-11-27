import axios from 'axios';
import authHeader from '../../services/auth-header';
// eslint-disable-next-line no-undef
const URL = process.env.REACT_APP_API_URL;

export const getProducts = async () => {
  const response = await axios.get(URL + `/products`, authHeader());
  return response.data;
};

export const filterProducts = async (
  name,
  priceFrom,
  priceTo,
  state,
  sortColumn,
  sortDirection
) => {
  const category = localStorage.getItem('Category');
  const response = await axios.post(
    URL + `/products/filter`,
    {
      category: category,
      name: name,
      priceFrom: priceFrom,
      priceTo: priceTo,
      state: state,
      sortColumn: sortColumn,
      sortDirection: sortDirection
    },
    authHeader()
  );
  return response.data;
};

export const getProduct = async (index) => {
  const response = await axios.get(URL + `/products/${index}`, authHeader());
  return response.data;
};

export const updateProduct = async (
  index,
  name,
  price,
  status,
  description,
  userId,
  category,
  image,
  city,
  hidden
) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('price', price);
  formData.append('status', status);
  formData.append('description', description);
  formData.append('user_id', userId);
  formData.append('category', category);
  formData.append('image', image);
  formData.append('city', city);
  formData.append('hidden', hidden);
  const response = await axios.put(URL + `/products/${index}`, formData, authHeader());
  return response.data;
};

export const addProduct = async (
  name,
  price,
  status,
  description,
  userId,
  category,
  image,
  city
) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('price', price);
  formData.append('status', status);
  formData.append('description', description);
  formData.append('user_id', userId);
  formData.append('category', category);
  formData.append('image', image);
  formData.append('city', city);
  const response = await axios.post(URL + `/products`, formData, authHeader());
  return response.data;
};

export const getProductImage = async (id) => {
  const response = await axios.get(`${URL}/products/getImage/${id}`, {
    responseType: 'arraybuffer'
  });
  return response.data;
};

export const getProductByUser = async (index) => {
  const response = await axios.get(URL + `/products/byUser/${index}`, authHeader());
  return response.data;
};

export const deleteProduct = async (index) => {
  const response = await axios.delete(URL + `/products/${index}`, authHeader());
  return response.data;
};

export const findMaxPrice = async () => {
  const response = await axios.get(URL + '/products/maxPrice', authHeader());
  return response.data;
};

export const findMinPrice = async () => {
  const response = await axios.get(URL + '/products/minPrice', authHeader());
  return response.data;
};

export const getWishlistProductsByUserID = async (id) => {
  const response = await axios.get(URL + `/products/wishlist/byUser/${id}`);
  return response.data;
};
