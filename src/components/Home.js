import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import HomeBtn from '../default_styles/HomeBtnStyle';
// import { Link } from 'react-router-dom';

function Home({ history }) {
  return (
    <HomeBtn className="home-btn" onClick={ history.goBack } aria-hidden="true">
      <FontAwesomeIcon icon={ faChevronLeft } />
    </HomeBtn>
  );
}

Home.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

export default Home;
