import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
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
});
