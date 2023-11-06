import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import EditUser from './EditUser';

describe('EditUser Component', () => {
  it('should render user data and handles form submission', async () => {
    const adminUpdateUser = jest.fn(() => Promise.resolve());
    render(<EditUser adminUpdateUser={adminUpdateUser} />);

    await waitFor(() => {
      expect(screen.getByText('Redaguoti naudotoją')).toBeInTheDocument();
      expect(screen.getByDisplayValue('MockUsername')).toBeInTheDocument();
      expect(screen.getByDisplayValue('mock@email.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('+11111111111')).toBeInTheDocument();
    });
    await user.click(screen.getByTestId('role'));
    await user.click(screen.getByText('USER'));

    const saveButton = screen.getByText('Išsaugoti');
    fireEvent.click(saveButton);
    await waitFor(() => {
      expect(adminUpdateUser).toHaveBeenCalledWith(
        'mockedUserId',
        'MockUsername',
        'mock@email.com',
        '+11111111111',
        'password',
        'USER'
      );
    });
  });

  it('should display email validation error', async () => {
    const adminUpdateUser = jest.fn(() => Promise.resolve());
    render(<EditUser adminUpdateUser={adminUpdateUser} />);

    await waitFor(() => {
      fireEvent.change(screen.getByTestId('el_pastas'), {
        target: { value: 'invalid-email' }
      });

      const saveButton = screen.getByText('Išsaugoti');
      fireEvent.click(saveButton);

      expect(screen.getByText('Email is not valid!')).toBeInTheDocument();
      expect(adminUpdateUser).not.toHaveBeenCalled();
    });
  });

  it('should display phone validation error', async () => {
    const adminUpdateUser = jest.fn(() => Promise.resolve());
    render(<EditUser adminUpdateUser={adminUpdateUser} />);

    await waitFor(() => {
      fireEvent.change(screen.getByTestId('tel_nr'), { target: { value: 'invalid-phone' } });

      const saveButton = screen.getByText('Išsaugoti');
      fireEvent.click(saveButton);

      expect(screen.getByText('Phone number is not valid!')).toBeInTheDocument();
      expect(adminUpdateUser).not.toHaveBeenCalled();
    });
  });
});
