import React, { useState } from 'react';
// import PropTypes from 'prop-types';

function SearchBar() {
  const [radioSearch, setRadioSearch] = useState('');
  console.log(radioSearch);
  return (
    <form>
      <input
        type="text"
        data-testid="search=input"
        placeholder="Search Recipe"
      />
      <div>
        <label htmlFor="ingredient-radio">
          <input
            data-testid="ingredient-search-radio"
            id="ingredient-radio"
            type="radio"
            name="search-radio"
            onChange={ () => setRadioSearch('ingredient') }
          />
          Ingredient
        </label>
        <label htmlFor="name-radio">
          <input
            data-testid="name-search-radio"
            id="name-radio"
            type="radio"
            name="search-radio"
            onChange={ () => setRadioSearch('name') }
          />
          Name
        </label>
        <label htmlFor="first-letter-radio">
          <input
            data-testid="first-letter-search-radio"
            id="first-letter-radio"
            type="radio"
            name="search-radio"
            onChange={ () => setRadioSearch('first-letter') }
          />
          First Letter
        </label>
      </div>
      <button
        type="submit"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </form>
  );
}

SearchBar.propTypes = {
};

export default SearchBar;
