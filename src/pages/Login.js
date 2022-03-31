import PropTypes from 'prop-types';
import React, { useState } from 'react';
import validateEmail from '../helpers/validateEmail';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const MIN_PASSWORD_LENGTH = 7;

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  };

  return (
    <form
      onSubmit={ handleSubmit }
      className="d-flex flex-column gap-4 w-75 mx-auto mt-5"
    >
      <h1
        className="text-center py-1 mt-4 mb-3 el-headline"
      >
        Login
      </h1>
      <input
        type="email"
        placeholder="E-mail"
        data-testid="email-input"
        className="form-control bg-light"
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <input
        type="password"
        placeholder="Password"
        data-testid="password-input"
        className="form-control bg-light my-4"
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <button
        type="submit"
        data-testid="login-submit-btn"
        className="el-btn"
        disabled={ !validateEmail(email) || password.length < MIN_PASSWORD_LENGTH }
      >
        Enter
      </button>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
