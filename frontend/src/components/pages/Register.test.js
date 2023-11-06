import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Register from './Register';

describe('Register Component', () => {
  it('should render correctly and handle registration', async () => {
    const register = jest.fn(() => Promise.resolve());
    render(<Register register={register} />);
    fireEvent.change(screen.getByTestId('vartotojo_vardas'), {
      target: { value: 'testuser' }
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

    fireEvent.click(screen.getByTestId('registruotis'));
    expect(register).toHaveBeenCalledWith(
      'testuser',
      'testemail@example.com',
      '+37066666666',
      'testpassword'
    );
  });

  it('should handle invalid email and phone number formats', async () => {
    const register = jest.fn(() => Promise.resolve());
    render(<Register register={register} />);

    fireEvent.change(screen.getByTestId('vartotojo_vardas'), {
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

    fireEvent.click(screen.getByTestId('registruotis'));

    await waitFor(() => {
      expect(screen.getByText('Neteisingas el. paštas')).toBeInTheDocument();
      expect(screen.getByText('Neteisingas tel. nr.')).toBeInTheDocument();
    });
  });

  it('should handle password confirmation mismatch', async () => {
    const register = jest.fn(() => Promise.resolve());
    render(<Register register={register} />);

    fireEvent.change(screen.getByTestId('vartotojo_vardas'), {
      target: { value: 'testuser' }
    });
    fireEvent.change(screen.getByTestId('el_pastas'), {
      target: { value: 'testemail@example.com' }
    });
    fireEvent.change(screen.getByTestId('tel_nr'), {
      target: { value: '+37066666666' }
    });
    fireEvent.change(screen.getByTestId('slaptazodis'), {
      target: { value: 'password123' }
    });
    fireEvent.change(screen.getByTestId('patvirtinti_slaptazodi'), {
      target: { value: 'mismatchedPassword' }
    });

    fireEvent.click(screen.getByTestId('registruotis'));

    await waitFor(() => {
      expect(screen.getByText('Nevienodi slaptažodžiai')).toBeInTheDocument();
    });
  });

  it('should display error label for empty username input', async () => {
    const register = jest.fn(() => Promise.resolve());
    render(<Register register={register} />);
    fireEvent.change(screen.getByTestId('vartotojo_vardas'), {
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

    fireEvent.click(screen.getByTestId('registruotis'));

    await waitFor(() => {
      expect(screen.getByTestId('vartotojo_vardas').validationMessage).toBe(
        'Įveskite vartotojo vardą'
      );
    });
  });

  it('should display error label for empty password input', async () => {
    const register = jest.fn(() => Promise.resolve());
    render(<Register register={register} />);
    fireEvent.change(screen.getByTestId('vartotojo_vardas'), {
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

    fireEvent.click(screen.getByTestId('registruotis'));

    await waitFor(() => {
      expect(screen.getByTestId('slaptazodis').validationMessage).toBe('Įveskite slaptažodį');
    });
  });

  it('should display error label for empty repeat-password input', async () => {
    const register = jest.fn(() => Promise.resolve());
    render(<Register register={register} />);
    fireEvent.change(screen.getByTestId('vartotojo_vardas'), {
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

    fireEvent.click(screen.getByTestId('registruotis'));

    await waitFor(() => {
      expect(screen.getByTestId('patvirtinti_slaptazodi').validationMessage).toBe(
        'Įveskite slaptažodį'
      );
    });
  });

  it('should display error label for empty phone input', async () => {
    const register = jest.fn(() => Promise.resolve());
    render(<Register register={register} />);
    fireEvent.change(screen.getByTestId('vartotojo_vardas'), {
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

    fireEvent.click(screen.getByTestId('registruotis'));

    await waitFor(() => {
      expect(screen.getByTestId('tel_nr').validationMessage).toBe('Įveskite tel. nr.');
    });
  });

  it('should display error label for empty email input', async () => {
    const register = jest.fn(() => Promise.resolve());
    render(<Register register={register} />);
    fireEvent.change(screen.getByTestId('vartotojo_vardas'), {
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

    fireEvent.click(screen.getByTestId('registruotis'));

    await waitFor(() => {
      expect(screen.getByTestId('el_pastas').validationMessage).toBe('Įveskite el. paštą');
    });
  });
});
