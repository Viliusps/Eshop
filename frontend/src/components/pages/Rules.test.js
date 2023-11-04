import React from 'react';
import { render, screen } from '@testing-library/react';
import Rules from './Rules';

describe('Rules Component', () => {
  it('should render the rules text', () => {
    render(<Rules />);
    expect(screen.getByText('1.1.')).toBeInTheDocument();
    expect(screen.getByText('1.2.')).toBeInTheDocument();
    expect(screen.getByText('1.3.')).toBeInTheDocument();
    expect(screen.getByText('1.4.')).toBeInTheDocument();
    expect(screen.getByText('1.5.')).toBeInTheDocument();
    expect(screen.getByText('1.6.')).toBeInTheDocument();
  });
});
