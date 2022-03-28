import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

test('02 - Tela de Login', () => {
  renderWithRouter(<App />);

  const emailInput = screen.getByPlaceholderText('E-mail');
  expect(emailInput).toBeInTheDocument();

  const passwordInput = screen.getByPlaceholderText('Password');
  expect(passwordInput).toBeInTheDocument();

  const enterButton = screen.getByRole('button', { name: 'Enter' });
  expect(enterButton).toBeInTheDocument();
});
