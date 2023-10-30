import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
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
});
