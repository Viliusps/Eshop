import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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
  it('should open the expected link when the button is clicked', async () => {
    const openSpy = jest.spyOn(window, 'open');
    render(<RecycleInfo />);

    var button = null;
    await waitFor(() => {
      button = screen.getByTestId('button');
    });
    fireEvent.click(button);

    expect(openSpy).toHaveBeenCalledWith(
      'https://atliekos.lt/miestas/vilniaus-m/paslauga/elektronikos-atliekos/',
      '_blank'
    );
    openSpy.mockRestore();
  });
});
