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
    phone: '+11111111111',
    password: 'password'
  };

  return Promise.resolve(mockUser);
};

export const getAllUsers = async () => {
  return Promise.resolve([
    {
      id: 'mockedUserId',
      username: 'MockUsername',
      email: 'mock@email.com',
      phone: '+11111111111'
    },
    {
      id: 'mockedUserId2',
      username: 'MockUsername2',
      email: 'moc2k@email.com',
      phone: '+11211111111'
    }
  ]);
};
