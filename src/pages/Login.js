import PropTypes from 'prop-types';
import React, { useState } from 'react';
import validateEmail from '../helpers/validateEmail';
import LoginStyle from '../default_styles/LoginStyle';

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
    <LoginStyle
      onSubmit={ handleSubmit }
      className=""
    >
      <h1
        className=""
      >
        Login
      </h1>
      <input
        type="email"
        placeholder="E-mail"
        data-testid="email-input"
        className=""
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <input
        type="password"
        placeholder="Password"
        data-testid="password-input"
        className=""
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <button
        type="submit"
        data-testid="login-submit-btn"
        className="el-btn"
        disabled={ !validateEmail(email) || password.length < MIN_PASSWORD_LENGTH }
      >
        Entrar
      </button>
    </LoginStyle>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
