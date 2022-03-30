import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore({ history, location }) {
  return (
    <div>
      <Header location={ location.pathname } history={ history } />
      <main>
        <Link to="/explore/foods">
          <button type="button" data-testid="explore-foods">
            Explore Foods
          </button>
        </Link>
        <Link to="/explore/drinks">
          <button type="button" data-testid="explore-drinks">
            Explore Drinks
          </button>
        </Link>
      </main>
      <Footer />
    </div>
  );
}

Explore.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Explore;
