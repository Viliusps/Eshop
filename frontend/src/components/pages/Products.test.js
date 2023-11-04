import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Products from './Products';
import { BrowserRouter } from 'react-router-dom';

describe('Products Component', () => {
  it('should render product cards', async () => {
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });

  it('should handle pagination', async () => {
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );
    await waitFor(() => {
      for (let i = 1; i <= 20; i++) {
        expect(screen.getByText(`Product ${i}`)).toBeInTheDocument();
      }
    });
    userEvent.click(screen.getByText('2'));

    await waitFor(() => {
      for (let i = 21; i <= 30; i++) {
        expect(screen.getByText(`Product ${i}`)).toBeInTheDocument();
      }
    });
  });

  it('should open product links', async () => {
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );
    await waitFor(() => {
      const link = screen.getByText('Product 1');
      userEvent.click(link);
      expect(window.location.pathname).toBe('/product/1');
    });
  });
});
