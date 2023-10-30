import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import EditProduct from './EditProduct';
import { getID, getRole } from '../api/__mocks__/users-axios';

describe('EditProduct Component', () => {
  it('should load product data correctly', async () => {
    render(<EditProduct />);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(screen.getByTestId('prekes_pavadinimas').value).toEqual('Mock product');
    expect(screen.getByTestId('prekes_kaina').value).toEqual('50.99');
    expect(screen.getByTestId('prekes_bukle').value).toEqual('Nauja');
    expect(screen.getByTestId('kategorija').value).toEqual('Telefonai');
    expect(screen.getByTestId('miestas').value).toEqual('Example City');
    expect(screen.getByTestId('prekes_aprasymas').value).toEqual('This is a mock description');

    await waitFor(() => {
      expect(getID()).resolves.toEqual('mockedUserId');
      expect(getRole()).resolves.toEqual('mockedRole');
    });
  });
});
