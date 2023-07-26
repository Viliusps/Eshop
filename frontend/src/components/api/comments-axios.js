import axios from 'axios';
const URL = process.env.REACT_APP_API_URL;
import authHeader from '../../services/auth-header';

export const getCommentsByProductId = async (id) => {
  const response = await axios.get(URL + `/comments/byProduct/${id}`);
  return response.data;
};

export const postComment = async (text, user_id, product_id, date) => {
  const response = await axios.post(
    URL + `/comments`,
    {
      text: text,
      user_id: user_id,
      product_id: product_id,
      date: date
    },
    authHeader()
  );
  return response.data;
};

export const likeComment = async (user_id, comment_id, status) => {
  const response = await axios.post(
    URL + `/reactions/likes`,
    {
      user_id: user_id,
      comment_id: comment_id,
      status: status
    },
    authHeader()
  );
  return response.data;
};

//returns an array of comments liked or disliked by user
export const getUserLikedComments = async (user_id, product_id, status) => {
  const response = await axios.post(
    URL + `/reactions/likedByUser`,
    {
      user_id: user_id,
      product_id: product_id,
      status: status
    },
    authHeader()
  );
  return response.data;
};
