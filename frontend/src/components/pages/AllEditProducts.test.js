import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import AllEditProducts from './AllEditProducts';

describe('AllEditProducts Component', () => {
  it('should render a list of products', async () => {
    render(<AllEditProducts />);

    await waitFor(() => {
      expect(screen.getByText('Mock nr1')).toBeInTheDocument();
      expect(screen.getByText('Mock nr2')).toBeInTheDocument();
    });
  });

  it('should handle product deletion', async () => {
    const deleteProduct = jest.fn(() =>
      Promise.resolve([
        {
          name: 'Mock nr2',
          price: 50.99,
          status: 'Sena',
          category: 'PHONES',
          city: 'Example City',
          description: 'This is a mock description',
          user_id: 'mockedUserId',
          hidden: false
        }
      ])
    );
    render(<AllEditProducts deleteProduct={deleteProduct} />);

    await waitFor(() => {
      expect(screen.getByText('Mock nr1')).toBeInTheDocument();
      const firstProductContainer = screen.getByText('Mock nr1').closest('.card');
      const deleteButton = within(firstProductContainer).getByText('Ištrinti');
      fireEvent.click(deleteButton);

      const confirmButton = screen.getByText('Patvirtinti');
      fireEvent.click(confirmButton);
      expect(deleteProduct).toHaveBeenCalledTimes(1);
    });
  });
});
