import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MealCard from '../components/MealCard';
import RecipesContext from '../context/RecipesContext';
import {
  fetchMealCategories,
  fetchMeals,
  fetchMealsByCategory,
} from '../services/fetchMeals';

function MainMealRecipes({ history, location }) {
  const { currentRecipes, setCurrentRecipes } = useContext(RecipesContext);

  const [mealCategories, setMealCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');

  useEffect(() => {
    const getCategoriesAndMeals = async () => {
      const categories = await fetchMealCategories();
      setMealCategories(categories);

      const meals = await fetchMeals();
      setCurrentRecipes(meals);
    };
    getCategoriesAndMeals();
  }, [setCurrentRecipes]);

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
      <section>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ handleCategory }
        >
          All
        </button>
        {mealCategories.map(({ strCategory }) => (
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
        {currentRecipes.map((meal, index) => (
          <MealCard key={ meal.idMeal } meal={ meal } index={ index } />
        ))}
      </section>
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
