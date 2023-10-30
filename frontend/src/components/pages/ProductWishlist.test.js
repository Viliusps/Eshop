import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProductWishlist from './ProductWishlist';
import { getWishlistProductsByUserID, getProductImage } from '../api/__mocks__/products-axios';

//does not work
describe('ProductWishlist Component', () => {
  it('should render correctly and display products', async () => {
    render(<ProductWishlist />);

    await waitFor(() => {
      expect(screen.getByText('Įsiminti skelbimai')).toBeInTheDocument();
      expect(screen.getByText('Mock nr1')).toBeInTheDocument();
      expect(screen.getByText(12.34)).toBeInTheDocument();
      expect(screen.getByText('Nauja')).toBeInTheDocument();
      expect(screen.getByText('Mock nr2')).toBeInTheDocument();
      expect(screen.getByText(50.99)).toBeInTheDocument();
      expect(screen.getByText('Sena')).toBeInTheDocument();
    });

    expect(getWishlistProductsByUserID).toHaveBeenCalledWith('mockedUserId');
    expect(getProductImage).toHaveBeenCalledTimes(2);
  });
});
