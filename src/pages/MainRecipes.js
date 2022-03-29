import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MainRecipes({ location }) {
  return (
    <>
      <Header location={ location.pathname } />
      <Footer />
    </>
  );
}

MainRecipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default MainRecipes;
