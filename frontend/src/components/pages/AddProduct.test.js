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

  it('should display error message when submitting with empty description', async () => {
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
      target: { value: '' }
    });
    fireEvent.click(screen.getByText('Išsaugoti'));

    await waitFor(() => {
      expect(screen.getByTestId('prekes_aprasymas').validationMessage).toBe(
        'Įveskite prekės aprašymą'
      );
    });
  });

  it('should display error message when submitting with an invalid price (greater than 10000)', async () => {
    render(<AddProduct />);

    fireEvent.change(screen.getByTestId('prekes_pavadinimas'), {
      target: { value: 'Test Product' }
    });
    fireEvent.change(screen.getByTestId('prekes_kaina'), { target: { value: '15000' } });
    await user.click(screen.getByTestId('prekes_bukle'));
    await user.click(screen.getByText('Nauja'));
    await user.click(screen.getByTestId('kategorija'));
    await user.click(screen.getByText('Telefonai'));
    fireEvent.change(screen.getByTestId('miestas'), { target: { value: 'City' } });
    fireEvent.change(screen.getByTestId('prekes_aprasymas'), {
      target: { value: 'asdasdasd' }
    });
    fireEvent.click(screen.getByText('Išsaugoti'));

    await waitFor(() => {
      expect(screen.getByText('Kaina turi būti žemesnė už 10000 Eur')).toBeInTheDocument();
    });
  });

  it('should display error message when submitting with an invalid price (negative value)', async () => {
    render(<AddProduct />);

    fireEvent.change(screen.getByTestId('prekes_pavadinimas'), {
      target: { value: 'Test Product' }
    });
    fireEvent.change(screen.getByTestId('prekes_kaina'), { target: { value: '-500' } });
    await user.click(screen.getByTestId('prekes_bukle'));
    await user.click(screen.getByText('Nauja'));
    await user.click(screen.getByTestId('kategorija'));
    await user.click(screen.getByText('Telefonai'));
    fireEvent.change(screen.getByTestId('miestas'), { target: { value: 'City' } });
    fireEvent.change(screen.getByTestId('prekes_aprasymas'), {
      target: { value: 'asdasdasdasd' }
    });
    fireEvent.click(screen.getByText('Išsaugoti'));

    await waitFor(() => {
      expect(screen.getByText('Kaina turi būti teigiama')).toBeInTheDocument();
    });
  });

  it('should display error message when submitting with empty status', async () => {
    render(<AddProduct />);
    fireEvent.change(screen.getByTestId('prekes_pavadinimas'), {
      target: { value: 'Test Product' }
    });
    fireEvent.change(screen.getByTestId('prekes_kaina'), { target: { value: '500' } });
    await user.click(screen.getByTestId('kategorija'));
    await user.click(screen.getByText('Telefonai'));
    fireEvent.change(screen.getByTestId('miestas'), { target: { value: 'City' } });
    fireEvent.change(screen.getByTestId('prekes_aprasymas'), {
      target: { value: 'asdasdasdasd' }
    });
    fireEvent.click(screen.getByText('Išsaugoti'));

    await waitFor(() => {
      expect(screen.getByText('Pasirinkite prekės būklę')).toBeInTheDocument();
    });
  });

  it('should display error message when submitting with empty category', async () => {
    render(<AddProduct />);

    fireEvent.change(screen.getByTestId('prekes_pavadinimas'), {
      target: { value: 'Test Product' }
    });
    fireEvent.change(screen.getByTestId('prekes_kaina'), { target: { value: '500' } });
    await user.click(screen.getByTestId('prekes_bukle'));
    await user.click(screen.getByText('Nauja'));
    fireEvent.change(screen.getByTestId('miestas'), { target: { value: 'City' } });
    fireEvent.change(screen.getByTestId('prekes_aprasymas'), {
      target: { value: 'asdasdasdasd' }
    });
    fireEvent.click(screen.getByText('Išsaugoti'));

    await waitFor(() => {
      expect(screen.getByText('Pasirinkite prekės kategoriją')).toBeInTheDocument();
    });
  });

  it('should display error message when submitting with an empty city', async () => {
    render(<AddProduct />);

    fireEvent.change(screen.getByTestId('prekes_pavadinimas'), {
      target: { value: 'Test Product' }
    });
    fireEvent.change(screen.getByTestId('prekes_kaina'), { target: { value: '500' } });
    await user.click(screen.getByTestId('prekes_bukle'));
    await user.click(screen.getByText('Nauja'));
    await user.click(screen.getByTestId('kategorija'));
    await user.click(screen.getByText('Telefonai'));
    fireEvent.change(screen.getByTestId('prekes_aprasymas'), {
      target: { value: 'asdasdasdasd' }
    });
    fireEvent.click(screen.getByText('Išsaugoti'));

    await waitFor(() => {
      expect(screen.getByTestId('miestas').validationMessage).toBe('Įveskite miestą');
    });
  });

  it('should display error message when submitting with an invalid city', async () => {
    render(<AddProduct />);

    fireEvent.change(screen.getByTestId('prekes_pavadinimas'), {
      target: { value: 'Test Product' }
    });
    fireEvent.change(screen.getByTestId('prekes_kaina'), { target: { value: '500' } });
    await user.click(screen.getByTestId('prekes_bukle'));
    await user.click(screen.getByText('Nauja'));
    await user.click(screen.getByTestId('kategorija'));
    await user.click(screen.getByText('Telefonai'));
    fireEvent.change(screen.getByTestId('miestas'), { target: { value: '123456' } });
    fireEvent.change(screen.getByTestId('prekes_aprasymas'), {
      target: { value: 'asdasdasdasd' }
    });
    fireEvent.click(screen.getByText('Išsaugoti'));

    await waitFor(() => {
      expect(screen.getByText('Neteisingai įvestas miestas')).toBeInTheDocument();
    });
  });
});
