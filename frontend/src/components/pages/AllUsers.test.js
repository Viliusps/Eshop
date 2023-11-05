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
      fireEvent.click(screen.queryByTestId('istrinti'));
    });

    await waitFor(() => fireEvent.click(screen.getByText('Patvirtinti')));
    await waitFor(() => expect(mockDeleteUser).toHaveBeenCalledTimes(1));
  });
});
