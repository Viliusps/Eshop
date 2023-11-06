import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AllUsers from './AllUsers';

describe('AllUsers Component', () => {
  it('should render user information', async () => {
    const mockDeleteUser = jest.fn(() => Promise.resolve());
    render(<AllUsers deleteUser={mockDeleteUser} />);
    await waitFor(() => {
      expect(screen.getByText('Test1')).toBeInTheDocument();
      expect(screen.getByText('USER')).toBeInTheDocument();
      expect(screen.getByText('mock@email.com')).toBeInTheDocument();
      expect(screen.getByText('+11111111111')).toBeInTheDocument();
      expect(screen.getByText('Test2')).toBeInTheDocument();
      expect(screen.getByText('ADMIN')).toBeInTheDocument();
      expect(screen.getByText('mock2@email.com')).toBeInTheDocument();
      expect(screen.getByText('+11211111111')).toBeInTheDocument();
    });
  });

  it('should delete a user when the delete button is clicked', async () => {
    const mockDeleteUser = jest.fn(() => Promise.resolve());
    render(<AllUsers deleteUser={mockDeleteUser} />);

    await waitFor(() => {
      expect(screen.getByText('Test1')).toBeInTheDocument();
      fireEvent.click(screen.getAllByTestId('istrinti')[0]);
    });

    await waitFor(() => fireEvent.click(screen.getByText('Patvirtinti')));
    await waitFor(() => expect(mockDeleteUser).toHaveBeenCalledTimes(1));
  });

  it('should block user', async () => {
    const adminUpdateUser = jest.fn(() => Promise.resolve());
    const mockDeleteUser = jest.fn(() => Promise.resolve());

    render(<AllUsers deleteUser={mockDeleteUser} adminUpdateUser={adminUpdateUser} />);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    fireEvent.click(screen.queryByTestId('blokuoti'));
    expect(adminUpdateUser).toHaveBeenCalledWith(
      'mockedUserId2',
      'Test2',
      'mock2@email.com',
      '+11211111111',
      'password2',
      'BLOCKED'
    );
  });

  it('should unblock user', async () => {
    const adminUpdateUser = jest.fn(() => Promise.resolve());
    const mockDeleteUser = jest.fn(() => Promise.resolve());

    render(<AllUsers deleteUser={mockDeleteUser} adminUpdateUser={adminUpdateUser} />);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    fireEvent.click(screen.queryByTestId('atblokuoti'));
    expect(adminUpdateUser).toHaveBeenCalledWith(
      'mockedUserId3',
      'Test3',
      'mock3@email.com',
      '+11311111111',
      'password3',
      'USER'
    );
  });
});
