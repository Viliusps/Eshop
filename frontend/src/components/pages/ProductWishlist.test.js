import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProductWishlist from './ProductWishlist';
import { BrowserRouter } from 'react-router-dom';

describe('Wishlist Component', () => {
  it('should render correctly and display products', async () => {
    const getWishlistProductsByUserID = jest.fn(() =>
      Promise.resolve([
        {
          name: 'Mock nr1',
          price: 12.34,
          status: 'Nauja',
          category: 'PHONES',
          city: 'Example City',
          description: 'This is a mock description',
          user_id: 'mockedUserId',
          hidden: false
        },
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
    const getProductImage = jest.fn(() => Promise.resolve('test'));
    render(
      <BrowserRouter>
        <ProductWishlist
          getWishlistProductsByUserID={getWishlistProductsByUserID}
          getProductImage={getProductImage}
        />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Įsiminti skelbimai')).toBeInTheDocument();
      expect(screen.getByText('Mock nr1')).toBeInTheDocument();
      expect(screen.getByText('$12.34')).toBeInTheDocument();
      expect(screen.getByText('Nauja')).toBeInTheDocument();
      expect(screen.getByText('Mock nr2')).toBeInTheDocument();
      expect(screen.getByText('$50.99')).toBeInTheDocument();
      expect(screen.getByText('Sena')).toBeInTheDocument();
    });

    expect(getWishlistProductsByUserID).toHaveBeenCalledWith('mockedUserId');
    expect(getProductImage).toHaveBeenCalledTimes(2);
  });

  it('should handle no data correctly', async () => {
    const getWishlistProductsByUserID = jest.fn(() => Promise.resolve([]));
    const getProductImage = jest.fn(() => Promise.resolve());
    render(
      <ProductWishlist
        getWishlistProductsByUserID={getWishlistProductsByUserID}
        getProductImage={getProductImage}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Sąrašas tuščias!')).toBeInTheDocument();
    });
    expect(getWishlistProductsByUserID).toHaveBeenCalledWith('mockedUserId');
    expect(getProductImage).toHaveBeenCalledTimes(0);
  });
});
