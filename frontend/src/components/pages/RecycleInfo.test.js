import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RecycleInfo from './RecycleInfo';

describe('RecycleInfo Component', () => {
  it('should render the component with location information', async () => {
    render(<RecycleInfo />);

    await waitFor(() => {
      expect(
        screen.getByText('Elektroninių įrenginių ir jų komponentų rūšiavimo vietos Lietuvoje')
      ).toBeInTheDocument();
      expect(screen.getByTestId('nepavyko')).toBeInTheDocument();
      expect(screen.getByTestId('button')).toBeInTheDocument();
    });
  });
});
