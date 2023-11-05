import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ProductDetails from './ProductDetails';

describe('ProductDetails Component', () => {
  it('should render product details', async () => {
    render(<ProductDetails />);
    await waitFor(() => {
      expect(screen.getByText('Mock product')).toBeInTheDocument();
      expect(screen.getByText('$50.99')).toBeInTheDocument();
      expect(screen.getByText('Nauja')).toBeInTheDocument();
      expect(screen.getByText('MockUsername')).toBeInTheDocument();
      expect(screen.getByText('mock@email.com')).toBeInTheDocument();
      expect(screen.getByText('+11111111111')).toBeInTheDocument();
      expect(screen.getByText('Example City')).toBeInTheDocument();
      expect(screen.getByText('This is a mock description')).toBeInTheDocument();
    });
  });

  it('should render product comments', async () => {
    render(<ProductDetails />);
    await waitFor(() => {
      expect(screen.getByText('Great product! I love it.')).toBeInTheDocument();
      expect(screen.getByText('This product is amazing. Highly recommended.')).toBeInTheDocument();
      expect(
        screen.getByText("Good value for the money. I'm satisfied with my purchase.")
      ).toBeInTheDocument();
    });
  });
});
