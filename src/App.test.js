import React from 'react';
import { render, screen } from '@testing-library/react';
import Spline from './components/calculator/Interpolation/Spline';

it('renders welcome message', () => {
  render(<Spline />);
  expect(screen.getByText('Spline')).toBeInTheDocument();
});