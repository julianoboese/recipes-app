import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import DrinkCard from '../components/DrinkCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useMainRecipes from '../hooks/useMainRecipes';
import RecipesContext from '../context/RecipesContext';
import {
  fetchDrinks,
  fetchDrinksByCategory,
} from '../services/fetchDrinks';
import MainStyled from '../default_styles/MainStyle';

function MainDrinkRecipes({ history, location }) {
  const { currentRecipes, setCurrentRecipes } = useContext(RecipesContext);

  const [currentCategory, setCurrentCategory] = useState('');

  const [recipeCategories, isLoading] = useMainRecipes(location.pathname);

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

      {!isLoading && (

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
            {recipeCategories.map(({ strCategory }) => (
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
      )}
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
