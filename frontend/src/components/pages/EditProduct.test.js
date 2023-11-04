import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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

  it('should handle negative price input', async () => {
    render(<EditProduct />);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    fireEvent.change(screen.getByTestId('prekes_kaina'), { target: { value: '-10' } });

    fireEvent.click(screen.getByText('Išsaugoti'));

    expect(screen.getByText('Kaina turi būti teigiama')).toBeInTheDocument();
  });

  it('should handle price exceeding 10000', async () => {
    render(<EditProduct />);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    fireEvent.change(screen.getByTestId('prekes_kaina'), { target: { value: '15000' } });

    fireEvent.click(screen.getByText('Išsaugoti'));

    expect(screen.getByText('Kaina negali būti didesnė nei 10000 Eur')).toBeInTheDocument();
  });

  it('should handle product deletion', async () => {
    const deleteProduct = jest.fn(() => Promise.resolve());
    render(<EditProduct deleteProduct={deleteProduct} />);

    await waitFor(() => {
      expect(screen.getByTestId('istrinti')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('istrinti'));

    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Patvirtinti'));

    await waitFor(() => {
      expect(deleteProduct).toHaveBeenCalledTimes(1);
    });
  });
});
