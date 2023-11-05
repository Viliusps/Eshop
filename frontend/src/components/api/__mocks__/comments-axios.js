export const getCommentsByProductId = async () => {
  return Promise.resolve([
    {
      text: 'Great product! I love it.',
      user_id: 1,
      product_id: 1,
      date: '2023-11-05'
    },
    {
      text: 'This product is amazing. Highly recommended.',
      user_id: 1,
      product_id: 1,
      date: '2023-11-06'
    },
    {
      text: "Good value for the money. I'm satisfied with my purchase.",
      user_id: 1,
      product_id: 1,
      date: '2023-11-07'
    }
  ]);
};
export const likeComment = async () => {
  return Promise.resolve();
};
export const postComment = async () => {
  return Promise.resolve();
};
export const getUserLikedComments = async () => {
  return Promise.resolve([
    {
      text: 'Great product! I love it.',
      user_id: 'mockedUserId',
      product_id: 1,
      date: '2023-11-05'
    },
    {
      text: 'This product is amazing. Highly recommended.',
      user_id: 'mockedUserId',
      product_id: 1,
      date: '2023-11-06'
    },
    {
      text: "Good value for the money. I'm satisfied with my purchase.",
      user_id: 'mockedUserId',
      product_id: 1,
      date: '2023-11-07'
    }
  ]);
};
