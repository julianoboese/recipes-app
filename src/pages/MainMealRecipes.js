import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import MealCard from '../components/MealCard';
import {
  fetchMealCategories,
  fetchMeals,
  fetchMealsByCategory,
} from '../services/fetchMeals';

function MainMealRecipes({ location }) {
  const [mealCategories, setMealCategories] = useState([]);
  const [mealRecipes, setMealRecipes] = useState([]);

  useEffect(() => {
    const getCategoriesAndMeals = async () => {
      const categories = await fetchMealCategories();
      setMealCategories(categories);

      const meals = await fetchMeals();
      setMealRecipes(meals);
    };
    getCategoriesAndMeals();
  }, []);

  const handleCategory = async ({ target }) => {
    const meals = await fetchMealsByCategory(target.innerHTML);
    setMealRecipes(meals);
  };

  return (
    <>
      <Header location={ location.pathname } />
      <section>
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
        {mealRecipes.map((meal, index) => (
          <MealCard key={ meal.idMeal } meal={ meal } index={ index } />
        ))}
      </section>
    </>
  );
}

MainMealRecipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default MainMealRecipes;
