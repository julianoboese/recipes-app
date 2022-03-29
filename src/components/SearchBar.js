import React, { useState, useContext } from 'react';
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
  const [searchValue, setSearchValue] = useState('');
  const [radioSearch, setRadioSearch] = useState('');
  const { setNewRecipes } = useContext(RecipesContext);

  const FIRST_LETTER = 'first-letter';

  const wrongNumberOfCaracters = (requestApi) => {
    if (searchValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      return requestApi(searchValue);
    }
  };

  const saveRecipes = (recipes, food) => {
    console.log(recipes);
    if (recipes.length === 1) {
      if (food === 'meals') {
        history.push(`/foods/${recipes[0].idMeal}`);
      } else {
        history.push(`/drinks/${recipes[0].idDrink}`);
      }
    } else {
      setNewRecipes(recipes);
    }
  };

  const nullSafeRecipe = (recipes, food) => {
    if (recipes === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      saveRecipes(recipes, food);
    }
  };

  const getMealsFromApi = async () => {
    let recipes;
    if (radioSearch === 'ingredient') {
      recipes = await fetchMealByIngredients(searchValue);
    } else if (radioSearch === 'name') {
      recipes = await fetchMealByName(searchValue);
    } else if (radioSearch === FIRST_LETTER) {
      recipes = await wrongNumberOfCaracters(fetchMealByFirstLetter);
    }

    nullSafeRecipe(recipes, 'meals');
  };

  const getDrinksFromApi = async () => {
    let recipes;
    if (radioSearch === 'ingredient') {
      recipes = await fetchDrinkByIngredients(searchValue);
    } else if (radioSearch === 'name') {
      recipes = await fetchDrinkByName(searchValue);
    } else if (radioSearch === FIRST_LETTER) {
      recipes = await wrongNumberOfCaracters(fetchDrinkByFirstLetter);
    }

    nullSafeRecipe(recipes, 'drinks');
  };

  const searchController = (event) => {
    event.preventDefault();
    const NOT_FOUND = -1;

    if (location.indexOf('foods') !== NOT_FOUND) {
      getMealsFromApi();
    } else if (location.indexOf('drinks') !== NOT_FOUND) {
      getDrinksFromApi();
    }
  };

  return (
    <form>
      <input
        type="text"
        data-testid="search-input"
        placeholder="Search Recipe"
        value={ searchValue }
        onChange={ ({ target }) => setSearchValue(target.value) }
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
        onClick={ searchController }
      >
        Search
      </button>
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
