import { render } from '@testing-library/react';
import AddProduct from './AddProduct';

describe('test', () => {
  it('tests smth', () => {
    render(<AddProduct />);

    screen.debug(undefined, Infinity);
  });
});
