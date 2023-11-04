import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import AddProduct from './AddProduct';
import user from '@testing-library/user-event';
import { getID } from '../api/__mocks__/users-axios';

describe('AddProduct Component', () => {
  it('should submit the form correctly', async () => {
    render(<AddProduct />);

    fireEvent.change(screen.getByTestId('prekes_pavadinimas'), {
      target: { value: 'Test Product' }
    });
    fireEvent.change(screen.getByTestId('prekes_kaina'), { target: { value: '500' } });
    await user.click(screen.getByTestId('prekes_bukle'));
    await user.click(screen.getByText('Nauja'));
    await user.click(screen.getByTestId('kategorija'));
    await user.click(screen.getByText('Telefonai'));
    fireEvent.change(screen.getByTestId('miestas'), { target: { value: 'City' } });
    fireEvent.change(screen.getByTestId('prekes_aprasymas'), {
      target: { value: 'This is a test product.' }
    });
    fireEvent.click(screen.getByText('Išsaugoti'));

    await waitFor(() => {
      expect(getID()).resolves.toEqual('mockedUserId');
    });
  }, 10000);
});
