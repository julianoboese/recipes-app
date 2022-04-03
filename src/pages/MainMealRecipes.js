import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import RecipesContext from '../context/RecipesContext';
import useMainRecipes from '../hooks/useMainRecipes';
import { fetchMeals, fetchMealsByCategory } from '../services/fetchMeals';

function MainMealRecipes({ history, location }) {
  const { currentRecipes, setCurrentRecipes } = useContext(RecipesContext);

  const [currentCategory, setCurrentCategory] = useState('');

  const [recipeCategories, isLoading] = useMainRecipes(location.pathname);

  const handleCategory = async ({ target }) => {
    if (target.innerHTML === currentCategory || target.innerHTML === 'All') {
      const recipes = await fetchMeals();
      setCurrentRecipes(recipes);
      setCurrentCategory('');
    } else {
      const recipes = await fetchMealsByCategory(target.innerHTML);
      setCurrentRecipes(recipes);
      setCurrentCategory(target.innerHTML);
    }
  };

  return (
    <>
      <Header location={ location.pathname } history={ history } />
      {!isLoading
      && (
        <main>
          <section>
            <button
              type="button"
              data-testid="All-category-filter"
              onClick={ handleCategory }
            >
              All
            </button>
            {recipeCategories.map(({ strCategory }) => (
              <button
                key={ strCategory }
                type="button"
                data-testid={ `${strCategory}-category-filter` }
                onClick={ handleCategory }
              >
                {strCategory}
              </button>
            ))}
          </section>
          <section>
            {currentRecipes.map((recipe, index) => (
              <RecipeCard key={ index } recipe={ recipe } index={ index } />
            ))}
          </section>
        </main>
      )}
      <Footer />
    </>
  );
}

MainMealRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default MainMealRecipes;
