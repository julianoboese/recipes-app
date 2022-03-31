import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function FavoriteRecipes({ history, location }) {
  return (
    <div>
      <Header location={ location.pathname } history={ history } />
    </div>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default FavoriteRecipes;
