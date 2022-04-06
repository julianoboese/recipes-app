import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreStyled from '../default_styles/ExploreStyle';

function Explore({ history, location }) {
  return (
    <div>
      <Header location={ location.pathname } history={ history } />
      <ExploreStyled>
        <Link to="/explore/foods" className="w-75">
          <button
            type="button"
            data-testid="explore-foods"
            className=""
          >
            Explore Foods
          </button>
        </Link>
        <Link to="/explore/drinks" className="w-75">
          <button
            type="button"
            data-testid="explore-drinks"
            className=""
          >
            Explore Drinks
          </button>
        </Link>
      </ExploreStyled>
      <Footer history={ history } />
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
