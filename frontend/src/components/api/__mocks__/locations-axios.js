export const getLocations = async () => {
  return Promise.resolve([
    {
      id: 1,
      name: 'Recycle Center 1',
      address: '123 Main St, City'
    },
    {
      id: 2,
      name: 'Recycle Center 2',
      address: '456 Elm St, Town'
    }
  ]);
};
