// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

global.ResizeObserver = require('resize-observer-polyfill');

jest.mock('./components/api/comments-axios.js');
jest.mock('./components/api/locations-axios.js');
jest.mock('./components/api/products-axios.js');
jest.mock('./components/api/token-axios.js');
jest.mock('./components/api/users-axios.js');
jest.mock('./components/api/wishlist-axios.js');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: 'mocked-path' })
}));
