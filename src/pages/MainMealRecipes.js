import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MealCard from '../components/MealCard';
import RecipesContext from '../context/RecipesContext';
import {
  fetchMeals,
  fetchMealsByCategory,
} from '../services/fetchMeals';
import MainStyled from '../default_styles/MainStyle';
import useMainRecipes from '../hooks/useMainRecipes';

function MainMealRecipes({ history, location }) {
  const { currentRecipes, setCurrentRecipes } = useContext(RecipesContext);

  // const [caterogryEmoji, setCaterogryEmoji] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');

  const [recipeCategories, isLoading] = useMainRecipes(location.pathname);

  const handleCategory = async ({ target }) => {
    if (target.innerHTML === currentCategory || target.innerHTML === 'All') {
      const meals = await fetchMeals();
      setCurrentRecipes(meals);
      setCurrentCategory('');
    } else {
      const meals = await fetchMealsByCategory(target.innerHTML);
      setCurrentRecipes(meals);
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
                { strCategory}
              </button>
            ))}
          </section>
          <section className="card-section">
            {currentRecipes.map((meal, index) => (
              <MealCard key={ index } meal={ meal } index={ index } />
            ))}
          </section>
        </MainStyled>
      )}
      <Footer history={ history } />
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
