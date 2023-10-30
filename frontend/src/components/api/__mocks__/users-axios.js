/* eslint-disable no-unused-vars */
export const getID = async () => {
  return Promise.resolve('mockedUserId');
};

export const getRole = async () => {
  return Promise.resolve('mockedRole');
};

export const getUser = async (index) => {
  const mockUser = {
    id: 'mockedUserId',
    username: 'MockUsername',
    email: 'mock@email.com',
    phone: '+11111111111'
  };

  return Promise.resolve(mockUser);
};
