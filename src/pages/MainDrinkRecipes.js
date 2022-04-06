import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import DrinkCard from '../components/DrinkCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import {
  fetchDrinkCategories,
  fetchDrinks,
  fetchDrinksByCategory,
} from '../services/fetchDrinks';
import MainStyled from '../default_styles/MainStyle';

function MainDrinkRecipes({ history, location }) {
  const { currentRecipes, setCurrentRecipes, ingredients, setIngredients,
    searchResults, setSearchResults } = useContext(RecipesContext);

  const [drinkCategories, setDrinkCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');

  useEffect(() => {
    const getCategoriesAndDrinks = async () => {
      const categories = await fetchDrinkCategories();
      setDrinkCategories(categories);

      if (searchResults.length > 0) {
        setCurrentRecipes(searchResults);
      } else if (ingredients.length > 0) {
        const MAX_RECIPES = 12;
        setCurrentRecipes(ingredients.splice(0, MAX_RECIPES));
      } else {
        const drinks = await fetchDrinks();
        setCurrentRecipes(drinks);
      }
    };
    getCategoriesAndDrinks();
  }, [setCurrentRecipes, ingredients, searchResults]);

  useEffect(() => () => {
    if (ingredients.length > 0) {
      setIngredients([]);
    }
    if (searchResults.length > 0) {
      setSearchResults([]);
    }
  }, [ingredients, setIngredients, searchResults, setSearchResults]);

  const handleCategory = async ({ target }) => {
    if (target.innerHTML === currentCategory || target.innerHTML === 'All') {
      const meals = await fetchDrinks();
      setCurrentRecipes(meals);
      setCurrentCategory('');
    } else {
      const drinks = await fetchDrinksByCategory(target.innerHTML);
      setCurrentRecipes(drinks);
      setCurrentCategory(target.innerHTML);
    }
  };

  return (
    <>
      <Header location={ location.pathname } history={ history } />
      <MainStyled>
        <section className="category-section">
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ handleCategory }
            className="category-item"
          >
            All
          </button>
          {drinkCategories.map(({ strCategory }) => (
            <button
              key={ strCategory }
              type="button"
              data-testid={ `${strCategory}-category-filter` }
              onClick={ handleCategory }
              className="category-item"
            >
              {strCategory}
            </button>
          ))}
        </section>
        <section className="card-section">
          {currentRecipes.map((drink, index) => (
            <DrinkCard key={ index } drink={ drink } index={ index } />
          ))}
        </section>
      </MainStyled>
      <Footer history={ history } />
    </>
  );
}

MainDrinkRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default MainDrinkRecipes;
