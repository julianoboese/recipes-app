import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';

function Home({ history }) {
  return (
    <span onClick={ history.goBack } aria-hidden="true">
      <FontAwesomeIcon icon={ faChevronLeft } />
    </span>
  );
}

Home.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

export default Home;
