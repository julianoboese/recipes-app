import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import HeaderStyles from '../default_styles/HeaderStyle';
import Home from './Home';

function Header({ location, history }) {
  const [isSearching, setIsSearching] = useState(false);

  const checkLocationAndGiveName = () => {
    let headingText = '';

    if (location === '/foods') headingText = 'Foods';
    if (location === '/drinks') headingText = 'Drinks';
    if (location === '/explore') headingText = 'Explore';
    if (location === '/explore/foods') headingText = 'Explore Foods';
    if (location === '/explore/drinks') headingText = 'Explore Drinks';
    if (location === '/explore/foods/ingredients') headingText = 'Explore Ingredients';
    if (location === '/explore/drinks/ingredients') headingText = 'Explore Ingredients';
    if (location === '/explore/foods/nationalities') {
      headingText = 'Explore Nationalities';
    }
    if (location === '/profile') headingText = 'Profile';
    if (location === '/favorite-recipes') headingText = 'Favorite Recipes';
    if (location === '/done-recipes') headingText = 'Done Recipes';

    return headingText;
  };

  const generateButton = () => {
    if (location === '/foods' || location === '/drinks'
     || location === '/explore/foods/nationalities') {
      return (<FontAwesomeIcon
        onClick={ () => setIsSearching(!isSearching) }
        icon={ faMagnifyingGlass }
      />);
    }
    return <Home />;
  };

  return (
    <HeaderStyles>
      <div className="header-container">
        {generateButton()}

        <p data-testid="page-title">
          {checkLocationAndGiveName()}
        </p>

        <Link to="/profile">
          <FontAwesomeIcon icon={ faUser } />
        </Link>

      </div>

      { isSearching && <SearchBar
        location={ location }
        history={ history }
      /> }
    </HeaderStyles>
  );
}

Header.propTypes = {
  location: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Header;
