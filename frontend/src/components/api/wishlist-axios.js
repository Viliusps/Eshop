import axios from 'axios';
import authHeader from '../../services/auth-header';
const URL = process.env.REACT_APP_API_URL;

export const deleteWishlistProduct = async (userId, productId) => {
  try {
    const response = await axios.delete(URL + `/wishlists/${userId}/${productId}`, authHeader());
    return response.data;
  } catch (err) {
    console.error(err.message);
    return [];
  }
};

export const addWishlistProduct = async (userId, productId) => {
  const response = await axios.post(
    URL + `/wishlists`,
    {
      userId: userId,
      productId: productId
    },
    authHeader()
  );
  return response.data;
};

export const wishlistProductExists = async (userID, productID) => {
  const response = await axios.get(URL + `/wishlists/exists/${userID}/${productID}`);
  return response.data;
};
