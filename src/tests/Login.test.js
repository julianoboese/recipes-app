// https://stackoverflow.com/questions/65205026/not-implemeted-window-errors-in-react-testing-library
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderUrl, history } from './helpers/renderUrl';
import '@testing-library/jest-dom';

describe('Login Screen', () => {
  beforeEach(() => renderUrl('/'));

  it('should render the login form components', () => {
    const emailInput = screen.getByPlaceholderText('E-mail');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText('Password');
    expect(passwordInput).toBeInTheDocument();

    const enterButton = screen.getByRole('button', { name: 'Enter' });
    expect(enterButton).toBeInTheDocument();
  });

  it('should validate the inputs before enabling the enter button', () => {
    const emailInput = screen.getByPlaceholderText('E-mail');
    const passwordInput = screen.getByPlaceholderText('Password');
    const enterButton = screen.getByRole('button', { name: 'Enter' });

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
  });

  it('should redirect the application to main screen after login', () => {
    const emailInput = screen.getByPlaceholderText('E-mail');
    const passwordInput = screen.getByPlaceholderText('Password');
    const enterButton = screen.getByRole('button', { name: 'Enter' });

    userEvent.type(emailInput, 'teste2@email.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(enterButton);
    expect(history.location.pathname).toBe('/foods');
  });
});
