import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ location }) {
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
    <header>

      <div className="d-flex align-items-center justify-content-between mt-2 mx-4">
        <Link to="/profile">
          <button type="button" className="btn btn-primary">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="icone de perfil"
            />
          </button>
        </Link>

        <p data-testid="page-title" className="mb-0">
          {checkLocationAndGiveName()}
        </p>

        <button
          onClick={ () => setIsSearching(!isSearching) }
          type="button"
          className="btn btn-primary"
        >
          <img src={ searchIcon } data-testid="search-top-btn" alt="icone de pesquisa" />
        </button>
      </div>

      { isSearching && <SearchBar /> }
    </header>
  );
}

Header.propTypes = {
  location: PropTypes.string.isRequired,
};

export default Header;
