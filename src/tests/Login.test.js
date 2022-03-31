import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';
import '@testing-library/jest-dom';

test('02 - Tela de Login', () => {
  const { history } = renderWithRouter(<App />);

  const emailInput = screen.getByPlaceholderText('E-mail');
  expect(emailInput).toBeInTheDocument();

  const passwordInput = screen.getByPlaceholderText('Password');
  expect(passwordInput).toBeInTheDocument();

  const enterButton = screen.getByRole('button', { name: 'Enter' });
  expect(enterButton).toBeInTheDocument();

  userEvent.type(emailInput, 'teste');
  expect(enterButton).toBeDisabled();
  userEvent.type(passwordInput, '123456');
  expect(enterButton).toBeDisabled();

  userEvent.type(emailInput, 'teste@email.com');
  expect(enterButton).toBeDisabled();

  userEvent.type(emailInput, 'teste');
  userEvent.type(passwordInput, '1234567');
  expect(enterButton).toBeDisabled();

  userEvent.type(emailInput, 'teste@email.com');
  expect(enterButton).not.toBeDisabled();

  userEvent.click(enterButton);
  expect(history.location.pathname).toBe('/foods');
});
