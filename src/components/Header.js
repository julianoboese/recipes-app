import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

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
    <header className="bg-dark">

      <div className="d-flex align-items-center justify-content-around py-2">
        <Link to="/profile">
          <button type="button" className="btn btn-primary">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="ícone de perfil"
            />
          </button>
        </Link>

        <p data-testid="page-title" className="mb-0 title-header">
          {checkLocationAndGiveName()}
        </p>

        <button
          onClick={ () => setIsSearching(!isSearching) }
          type="button"
          className="btn btn-primary"
        >
          {(location === '/foods' || location === '/drinks'
            || location === '/explore/foods/nationalities')
            && <img
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="ícone de pesquisa"
            />}
        </button>
      </div>

      { isSearching && <SearchBar location={ location } history={ history } /> }
    </header>
  );
}

Header.propTypes = {
  location: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Header;
