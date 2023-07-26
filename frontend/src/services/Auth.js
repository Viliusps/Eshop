import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

Auth.propTypes = {
  check: PropTypes.bool
};

export default function Auth({ check }) {
  return check ? <Outlet /> : <Navigate to="/product" replace />;
}
