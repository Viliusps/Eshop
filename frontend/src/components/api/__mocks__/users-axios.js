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
      username: 'Test1',
      email: 'mock@email.com',
      phone: '+11111111111',
      password: 'password',
      role: 'USER'
    },
    {
      id: 'mockedUserId2',
      username: 'Test2',
      email: 'mock2@email.com',
      phone: '+11211111111',
      password: 'password2',
      role: 'ADMIN'
    },
    {
      id: 'mockedUserId3',
      username: 'Test3',
      email: 'mock3@email.com',
      phone: '+11311111111',
      password: 'password3',
      role: 'BLOCKED'
    }
  ]);
};

export const adminUpdateUser = async () => {
  return Promise.resolve();
};
