import React from 'react';
import { render, screen } from '@testing-library/react';
import Spline from './components/calculator/Interpolation/Spline';
import Newton from './components/calculator/Interpolation/Newtondivide';
it('renders welcome message', () => {
  render(<Spline />);
  expect(screen.getByText('Spline')).toBeInTheDocument();
  render(<Newton />);
  expect(screen.getByText('Newton Divide Difference')).toBeInTheDocument();
});