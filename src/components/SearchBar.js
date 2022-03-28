import React, { useState, useContext } from 'react';
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
import recipesContext from '../context/RecipesContext';
// import PropTypes from 'prop-types';

function SearchBar(props) {
  const [searchValue, setSearchValue] = useState('');
  const [radioSearch, setRadioSearch] = useState('');

  const { setNewRecipes } = useContext(recipesContext);

  const FIRST_LETTER = 'first-letter';
  console.log(radioSearch);

  const wrongLetter = (requestApi) => {
    if (searchValue.length === 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      return requestApi();
    }
  };

  const saveRecipes = (recipes, food) => {
    if (recipes.length === 1) {
      const { history } = props;
      if (food === 'Meals') {
        history.push(`/foods/${recipes[0].idMeal}`);
      } else {
        history.push(`/drinks/${recipes[0].idDrink}`);
      }
    } else {
      setNewRecipes(recipes);
    }
  };

  const getMealsFromApi = () => {
    let recipes;
    if (radioSearch === 'ingredient') {
      recipes = fetchMealByIngredients();
    } else if (radioSearch === 'name') {
      recipes = fetchMealByName();
    } else if (radioSearch === FIRST_LETTER) {
      recipes = wrongLetter(fetchMealByFirstLetter);
    }

    if (recipes === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      saveRecipes(recipes, 'Meals');
    }
  };

  const getDrinksFromApi = () => {
    let recipes;
    if (radioSearch === 'ingredient') {
      recipes = fetchDrinkByIngredients();
    } else if (radioSearch === 'name') {
      recipes = fetchDrinkByName();
    } else if (radioSearch === FIRST_LETTER) {
      recipes = wrongLetter(fetchDrinkByFirstLetter);
    }

    if (recipes === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else {
      saveRecipes(recipes, 'drinks');
    }
  };

  const searchController = (event) => {
    event.preventDefault();

    const currentLocal = window.location.pathname;

    if (currentLocal === '/food') {
      getMealsFromApi();
    } else if (currentLocal === '/drinks') {
      getDrinksFromApi();
    }
  };

  return (
    <form>
      <input
        type="text"
        data-testid="search=input"
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
};

export default SearchBar;
