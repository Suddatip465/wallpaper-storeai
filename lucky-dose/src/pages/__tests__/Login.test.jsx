import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login';
import { BrowserRouter } from 'react-router-dom';

test('renders login form', () => {
  render(<BrowserRouter><Login /></BrowserRouter>);
  expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
});
