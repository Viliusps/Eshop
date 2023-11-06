import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  it('should render correctly and handle login', async () => {
    const login = jest.fn(() => Promise.resolve());
    render(<Login login={login} />);
    await waitFor(() => {
      expect(screen.getByTestId('registruotis'));
    });

    fireEvent.change(screen.getByTestId('vartotojo_vardas'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByTestId('slaptazodis'), { target: { value: 'testpassword' } });
    fireEvent.click(screen.getByTestId('prisijungti'));

    expect(login).toHaveBeenCalledWith('testuser', 'testpassword');
  });

  it('should display error label for invalid data input', async () => {
    // eslint-disable-next-line no-unused-vars
    const login = jest.fn((username, password) => {
      const errorResponse = new Error('Invalid data');
      errorResponse.response = { status: 404 };
      return Promise.reject(errorResponse);
    });
    render(<Login login={login} />);

    fireEvent.change(screen.getByTestId('vartotojo_vardas'), { target: { value: 'invaliduser' } });
    fireEvent.change(screen.getByTestId('slaptazodis'), { target: { value: 'invalidpassword' } });
    fireEvent.click(screen.getByTestId('prisijungti'));

    await waitFor(() => {
      expect(screen.getByText('Blogas vartotojo vardas ar slaptažodis.')).toBeInTheDocument();
    });
  });
  it('should display error label for empty username input', async () => {
    // eslint-disable-next-line no-unused-vars
    const login = jest.fn((username, password) => {
      const errorResponse = new Error('Invalid data');
      errorResponse.response = { status: 404 };
      return Promise.reject(errorResponse);
    });
    render(<Login login={login} />);
    const usernameComponent = screen.getByTestId('vartotojo_vardas');

    fireEvent.change(usernameComponent, { target: { value: '' } });
    fireEvent.change(screen.getByTestId('slaptazodis'), { target: { value: 'slaptazodis' } });
    fireEvent.click(screen.getByTestId('prisijungti'));

    await waitFor(() => {
      expect(usernameComponent.validationMessage).toBe('Įveskite vartotojo vardą');
    });
  });
  it('should display error label for empty password input', async () => {
    // eslint-disable-next-line no-unused-vars
    const login = jest.fn((username, password) => {
      const errorResponse = new Error('Invalid data');
      errorResponse.response = { status: 404 };
      return Promise.reject(errorResponse);
    });
    render(<Login login={login} />);
    const loginComponent = screen.getByTestId('slaptazodis');

    fireEvent.change(screen.getByTestId('vartotojo_vardas'), { target: { value: 'vardas' } });
    fireEvent.change(loginComponent, { target: { value: '' } });
    fireEvent.click(screen.getByTestId('prisijungti'));

    await waitFor(() => {
      expect(loginComponent.validationMessage).toBe('Įveskite slaptažodį');
    });
  });

  it('should display error if user is blocked', async () => {
    // eslint-disable-next-line no-unused-vars
    const login = jest.fn((username, password) => {
      const errorResponse = new Error('Blocked');
      errorResponse.response = { status: 401 };
      return Promise.reject(errorResponse);
    });
    render(<Login login={login} />);

    fireEvent.change(screen.getByTestId('vartotojo_vardas'), { target: { value: 'vardas' } });
    fireEvent.change(screen.getByTestId('slaptazodis'), { target: { value: 'slaptazodis' } });
    fireEvent.click(screen.getByTestId('prisijungti'));

    await waitFor(() => {
      expect(screen.getByText('Neturite prieigos prie paskyros')).toBeInTheDocument();
    });
  });
});
