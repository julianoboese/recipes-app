import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  fetchMealByIngredients,
  fetchMealByName,
  fetchMealByFirstLetter,
} from '../services/fetchMeals';
import {
  fetchDrinkByIngredients,
  fetchDrinkByName,
  fetchDrinkByFirstLetter,
} from '../services/fetchDrinks';
import RecipesContext from '../context/RecipesContext';

function SearchBar({ history, location }) {
  const [formClass, setFormClass] = useState('search-form-hidden');
  const [searchValue, setSearchValue] = useState('');
  const [radioSearch, setRadioSearch] = useState('');
  const { setSearchResults } = useContext(RecipesContext);

  useEffect(() => {
    setFormClass('search-form-shown');

    return () => setFormClass('search-form-hidden');
  }, []);

  const FIRST_LETTER = 'first-letter';

  const wrongNumberOfCharacters = async (requestApi) => {
    if (searchValue.length >= 2) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const result = await requestApi(searchValue);
      return result;
    }
  };

  const saveRecipes = async (recipes, food) => {
    if (recipes.length === 1) {
      if (food === 'meals') {
        history.push(`/foods/${recipes[0].idMeal}`);
      } else {
        history.push(`/drinks/${recipes[0].idDrink}`);
      }
    } else {
      setSearchResults(recipes);
      setSearchValue('');
    }
  };

  const nullSafeRecipe = (recipes, food) => {
    if (!recipes) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      const MAX_RECIPES = 12;
      saveRecipes(recipes.slice(0, MAX_RECIPES), food);
    }
  };

  const getRecipes = async (fetchByIngredient, fetchByName, fetchByFirstLetter) => {
    let recipes;
    if (radioSearch === 'ingredient') {
      recipes = await fetchByIngredient(searchValue);
    } else if (radioSearch === 'name') {
      recipes = await fetchByName(searchValue);
    } else if (radioSearch === FIRST_LETTER) {
      recipes = await wrongNumberOfCharacters(fetchByFirstLetter);
    }
    if (recipes !== undefined) {
      nullSafeRecipe(recipes, 'meals');
    }
  };

  const searchController = (event) => {
    event.preventDefault();
    if (location.includes('foods')) {
      getRecipes(fetchMealByIngredients, fetchMealByName, fetchMealByFirstLetter);
    } else {
      getRecipes(fetchDrinkByIngredients, fetchDrinkByName, fetchDrinkByFirstLetter);
    }
  };

  return (
    <form className={ formClass }>
      <div className="search-inputs">
        <div>
          <input
            type="text"
            data-testid="search-input"
            placeholder="Search Recipe"
            value={ searchValue }
            onChange={ ({ target }) => setSearchValue(target.value) }
          />
          <button
            type="submit"
            data-testid="exec-search-btn"
            onClick={ searchController }
          >
            Search
          </button>
        </div>

        <div className="radio-container">
          <label className="radio-buttons" htmlFor="ingredient-radio">
            <input
              data-testid="ingredient-search-radio"
              id="ingredient-radio"
              type="radio"
              name="search-radio"
              onChange={ () => setRadioSearch('ingredient') }
            />
            {' '}
            Ingredient
          </label>
          <label className="radio-buttons" htmlFor="name-radio">
            <input
              data-testid="name-search-radio"
              id="name-radio"
              type="radio"
              name="search-radio"
              onChange={ () => setRadioSearch('name') }
            />
            {' '}
            Name
          </label>
          <label className="radio-buttons" htmlFor="first-letter-radio">
            <input
              data-testid="first-letter-search-radio"
              id="first-letter-radio"
              type="radio"
              name="search-radio"
              onChange={ () => setRadioSearch('first-letter') }
            />
            {' '}
            First Letter
          </label>
        </div>
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.string.isRequired,
};

export default SearchBar;
