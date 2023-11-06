import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Profile from './Profile';

describe('Profile Component', () => {
  it('should render correctly and update user profile', async () => {
    const updateUser = jest.fn(() => Promise.resolve());

    render(<Profile updateUser={updateUser} />);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(screen.getByTestId('vardas')).toHaveValue('MockUsername');
    expect(screen.getByTestId('el_pastas')).toHaveValue('mock@email.com');
    expect(screen.getByTestId('tel_nr')).toHaveValue('+11111111111');

    fireEvent.change(screen.getByTestId('vardas'), {
      target: { value: 'newuser' }
    });
    fireEvent.change(screen.getByTestId('el_pastas'), {
      target: { value: 'newuser@example.com' }
    });
    fireEvent.change(screen.getByTestId('tel_nr'), {
      target: { value: '+987654321' }
    });
    fireEvent.change(screen.getByTestId('slaptazodis'), {
      target: { value: 'newpassword' }
    });
    fireEvent.change(screen.getByTestId('patvirtinti_slaptazodi'), {
      target: { value: 'newpassword' }
    });

    fireEvent.click(screen.getByText('Išsaugoti'));

    expect(updateUser).toHaveBeenCalledWith(
      'mockedUserId',
      'newuser',
      'newuser@example.com',
      '+987654321',
      'newpassword'
    );
  });
  it('should handle invalid email and phone number formats', async () => {
    const updateUser = jest.fn(() => Promise.resolve());
    render(<Profile updateUser={updateUser} />);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    fireEvent.change(screen.getByTestId('vardas'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByTestId('el_pastas'), {
      target: { value: 'invalid-email' }
    });
    fireEvent.change(screen.getByTestId('tel_nr'), {
      target: { value: 'invalid-phone' }
    });
    fireEvent.change(screen.getByTestId('slaptazodis'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByTestId('patvirtinti_slaptazodi'), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByText('Išsaugoti'));

    await waitFor(() => {
      expect(screen.getByText('Neteisingas el. paštas')).toBeInTheDocument();
      expect(screen.getByText('Neteisingas tel. nr.')).toBeInTheDocument();
    });
  });

  it('should handle password confirmation mismatch', async () => {
    const updateUser = jest.fn(() => Promise.resolve());
    render(<Profile updateUser={updateUser} />);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    fireEvent.change(screen.getByTestId('slaptazodis'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByTestId('patvirtinti_slaptazodi'), {
      target: { value: 'mismatchedPassword' }
    });

    fireEvent.click(screen.getByText('Išsaugoti'));

    await waitFor(() => {
      expect(screen.getByText('Nevienodi slaptažodžiai')).toBeInTheDocument();
    });
  });

  it('should display error label for empty username input', async () => {
    const updateUser = jest.fn(() => Promise.resolve());
    render(<Profile updateUser={updateUser} />);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    fireEvent.change(screen.getByTestId('vardas'), {
      target: { value: '' }
    });
    fireEvent.change(screen.getByTestId('el_pastas'), {
      target: { value: 'testemail@example.com' }
    });
    fireEvent.change(screen.getByTestId('tel_nr'), {
      target: { value: '+37066666666' }
    });
    fireEvent.change(screen.getByTestId('slaptazodis'), {
      target: { value: 'testpassword' }
    });
    fireEvent.change(screen.getByTestId('patvirtinti_slaptazodi'), {
      target: { value: 'testpassword' }
    });

    fireEvent.click(screen.getByText('Išsaugoti'));

    await waitFor(() => {
      expect(screen.getByTestId('vardas').validationMessage).toBe('Įveskite vartotojo vardą');
    });
  });

  it('should display error label for empty password input', async () => {
    const updateUser = jest.fn(() => Promise.resolve());
    render(<Profile updateUser={updateUser} />);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    fireEvent.change(screen.getByTestId('vardas'), {
      target: { value: 'vartotojo_vardas' }
    });
    fireEvent.change(screen.getByTestId('el_pastas'), {
      target: { value: 'testemail@example.com' }
    });
    fireEvent.change(screen.getByTestId('tel_nr'), {
      target: { value: '+37066666666' }
    });
    fireEvent.change(screen.getByTestId('slaptazodis'), {
      target: { value: '' }
    });
    fireEvent.change(screen.getByTestId('patvirtinti_slaptazodi'), {
      target: { value: 'testpassword' }
    });

    fireEvent.click(screen.getByText('Išsaugoti'));

    await waitFor(() => {
      expect(screen.getByTestId('slaptazodis').validationMessage).toBe('Įveskite slaptažodį');
    });
  });

  it('should display error label for empty repeat-password input', async () => {
    const updateUser = jest.fn(() => Promise.resolve());
    render(<Profile updateUser={updateUser} />);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    fireEvent.change(screen.getByTestId('vardas'), {
      target: { value: 'vartotojo_vardas' }
    });
    fireEvent.change(screen.getByTestId('el_pastas'), {
      target: { value: 'testemail@example.com' }
    });
    fireEvent.change(screen.getByTestId('tel_nr'), {
      target: { value: '+37066666666' }
    });
    fireEvent.change(screen.getByTestId('slaptazodis'), {
      target: { value: 'testpassword' }
    });
    fireEvent.change(screen.getByTestId('patvirtinti_slaptazodi'), {
      target: { value: '' }
    });

    fireEvent.click(screen.getByText('Išsaugoti'));

    await waitFor(() => {
      expect(screen.getByTestId('patvirtinti_slaptazodi').validationMessage).toBe(
        'Įveskite slaptažodį'
      );
    });
  });

  it('should display error label for empty phone input', async () => {
    const updateUser = jest.fn(() => Promise.resolve());
    render(<Profile updateUser={updateUser} />);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    fireEvent.change(screen.getByTestId('vardas'), {
      target: { value: 'vartotojo_vardas' }
    });
    fireEvent.change(screen.getByTestId('el_pastas'), {
      target: { value: 'testemail@example.com' }
    });
    fireEvent.change(screen.getByTestId('tel_nr'), {
      target: { value: '' }
    });
    fireEvent.change(screen.getByTestId('slaptazodis'), {
      target: { value: 'testpassword' }
    });
    fireEvent.change(screen.getByTestId('patvirtinti_slaptazodi'), {
      target: { value: 'testpassword' }
    });

    fireEvent.click(screen.getByText('Išsaugoti'));

    await waitFor(() => {
      expect(screen.getByTestId('tel_nr').validationMessage).toBe('Įveskite tel. nr.');
    });
  });

  it('should display error label for empty email input', async () => {
    const updateUser = jest.fn(() => Promise.resolve());
    render(<Profile updateUser={updateUser} />);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    fireEvent.change(screen.getByTestId('vardas'), {
      target: { value: 'vartotojo_vardas' }
    });
    fireEvent.change(screen.getByTestId('el_pastas'), {
      target: { value: '' }
    });
    fireEvent.change(screen.getByTestId('tel_nr'), {
      target: { value: '+37066666666' }
    });
    fireEvent.change(screen.getByTestId('slaptazodis'), {
      target: { value: 'testpassword' }
    });
    fireEvent.change(screen.getByTestId('patvirtinti_slaptazodi'), {
      target: { value: 'testpassword' }
    });

    fireEvent.click(screen.getByText('Išsaugoti'));

    await waitFor(() => {
      expect(screen.getByTestId('el_pastas').validationMessage).toBe('Įveskite el. paštą');
    });
  });
});
