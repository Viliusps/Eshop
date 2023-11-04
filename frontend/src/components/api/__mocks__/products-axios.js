export const addProduct = async () => {
  return Promise.resolve();
};

export const getProduct = async () => {
  const mockProduct = {
    name: 'Mock product',
    price: 50.99,
    status: 'Nauja',
    category: 'PHONES',
    city: 'Example City',
    description: 'This is a mock description',
    user_id: 'mockedUserId',
    hidden: false
  };

  return Promise.resolve(mockProduct);
};

export const getProductImage = async () => {
  const mockImageData = 'test';
  return Promise.resolve(mockImageData);
};

export const getWishlistProductsByUserID = async () => {
  return Promise.resolve([
    {
      name: 'Mock nr1',
      price: 12.34,
      status: 'Nauja',
      category: 'PHONES',
      city: 'Example City',
      description: 'This is a mock description',
      user_id: 'mockedUserId',
      hidden: false
    },
    {
      name: 'Mock nr2',
      price: 50.99,
      status: 'Sena',
      category: 'PHONES',
      city: 'Example City',
      description: 'This is a mock description',
      user_id: 'mockedUserId',
      hidden: false
    }
  ]);
};

export const filterProducts = async () => {
  return Promise.resolve(
    Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      price: (i + 1) * 10,
      status: 'In Stock'
    }))
  );
};

export const findMaxPrice = async () => {
  return Promise.resolve(1000);
};

export const findMinPrice = async () => {
  return Promise.resolve(10);
};
