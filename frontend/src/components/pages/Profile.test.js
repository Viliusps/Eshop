import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Profile from './Profile';

describe('Profile Component', () => {
  it('should render correctly and update user profile', async () => {
    const updateUser = jest.fn(() => Promise.resolve());

    render(<Profile updateUser={updateUser} />);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(screen.getByTestId('vardas')).toHaveValue('MockUsername');
    expect(screen.getByTestId('el_pastas')).toHaveValue('mock@email.com');
    expect(screen.getByTestId('tel_nr')).toHaveValue('+11111111111');

    fireEvent.change(screen.getByTestId('vardas'), {
      target: { value: 'newuser' }
    });
    fireEvent.change(screen.getByTestId('el_pastas'), {
      target: { value: 'newuser@example.com' }
    });
    fireEvent.change(screen.getByTestId('tel_nr'), {
      target: { value: '+987654321' }
    });
    fireEvent.change(screen.getByTestId('slaptazodis'), {
      target: { value: 'newpassword' }
    });
    fireEvent.change(screen.getByTestId('patvirtinti_slaptazodi'), {
      target: { value: 'newpassword' }
    });

    fireEvent.click(screen.getByText('Išsaugoti'));

    expect(updateUser).toHaveBeenCalledWith(
      'mockedUserId',
      'newuser',
      'newuser@example.com',
      '+987654321',
      'newpassword'
    );
  });
  it('should handle invalid email and phone number formats', async () => {
    const updateUser = jest.fn(() => Promise.resolve());
    render(<Profile updateUser={updateUser} />);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    fireEvent.change(screen.getByTestId('vardas'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByTestId('el_pastas'), {
      target: { value: 'invalid-email' }
    });
    fireEvent.change(screen.getByTestId('tel_nr'), {
      target: { value: 'invalid-phone' }
    });
    fireEvent.change(screen.getByTestId('slaptazodis'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByTestId('patvirtinti_slaptazodi'), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByText('Išsaugoti'));

    await waitFor(() => {
      expect(screen.getByText('Neteisingas el. paštas')).toBeInTheDocument();
      expect(screen.getByText('Neteisingas tel. nr.')).toBeInTheDocument();
    });
  });

  it('should handle password confirmation mismatch', async () => {
    const updateUser = jest.fn(() => Promise.resolve());
    render(<Profile updateUser={updateUser} />);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    fireEvent.change(screen.getByTestId('slaptazodis'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByTestId('patvirtinti_slaptazodi'), {
      target: { value: 'mismatchedPassword' }
    });

    fireEvent.click(screen.getByText('Išsaugoti'));

    await waitFor(() => {
      expect(screen.getByText('Nevienodi slaptažodžiai')).toBeInTheDocument();
    });
  });
});
