import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import HeaderStyles from '../default_styles/HeaderStyle';

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

  return (
    <HeaderStyles>

      <div className="header-container">
        <Link to="/profile">
          <FontAwesomeIcon icon={ faUser } />
        </Link>

        <p data-testid="page-title" className="mb-0 title-header">
          {checkLocationAndGiveName()}
        </p>

        {(location === '/foods' || location === '/drinks'
            || location === '/explore/foods/nationalities')
            && <FontAwesomeIcon
              onClick={ () => setIsSearching(!isSearching) }
              icon={ faMagnifyingGlass }
            />}
      </div>

      { isSearching && <SearchBar location={ location } history={ history } /> }
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
