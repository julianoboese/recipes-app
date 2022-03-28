import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

function MainRecipes({ location }) {
  return (
    <Header location={ location.pathname } />
  );
}

MainRecipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default MainRecipes;
