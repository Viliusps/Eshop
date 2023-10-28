import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import AddProduct from './AddProduct';
import * as productsAxios from '../api/__mocks__/products-axios';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => () => {},
  useLocation: () => ({ pathname: 'mocked-path' })
}));

// jest.mock('axios');
//
// jest.mock('../api/products-axios', () => ({
//   addProduct: jest.fn().mockResolvedValue({})
// }));
//
// jest.mock('../api/users-axios', () => ({
//   getID: jest.fn(() => Promise.resolve('mockedUserId'))
// }));

describe('AddProduct Component', () => {
  it('should validate and submit the form correctly', async () => {
    const addProductMock = productsAxios.addProduct;

    render(<AddProduct />);

    const nameInput = screen.getByTestId('Prekės pavadinimas');
    const priceInput = screen.getByTestId('Prekės kaina');
    const statusSelect = screen.getByTestId('Prekės būklė');
    const categorySelect = screen.getByTestId('Kategorija');
    const cityInput = screen.getByTestId('Miestas');
    const descriptionTextarea = screen.getByTestId('Prekės aprašymas');
    const saveButton = screen.getByText('Išsaugoti');

    fireEvent.change(nameInput, { target: { value: 'Test Product' } });
    fireEvent.change(priceInput, { target: { value: '500' } });
    fireEvent.change(statusSelect, { target: { value: 'Nauja' } });
    fireEvent.change(categorySelect, { target: { value: 'Electronics' } });
    fireEvent.change(cityInput, { target: { value: 'Test City' } });
    fireEvent.change(descriptionTextarea, { target: { value: 'This is a test product.' } });

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(addProductMock).toHaveBeenCalledWith(
        'Test Product',
        '500',
        'Nauja',
        'This is a test product.',
        'mockedUserId',
        'Electronics',
        null,
        'Test City'
      );
    });
  });
});
