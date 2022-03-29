import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

function MainRecipes({ location, history }) {
  return (
    <Header location={ location.pathname } history={ history } />
  );
}

MainRecipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default MainRecipes;
