import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  it('should render correctly and handle login', async () => {
    const login = jest.fn(() => Promise.resolve());
    render(<Login login={login} />);

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
      const errorLabel = screen.getByText('Blogas vartotojo vardas ar slaptažodis.');
      expect(errorLabel).toBeInTheDocument();
    });
  });
});
