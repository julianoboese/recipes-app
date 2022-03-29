import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import DrinkCard from '../components/DrinkCard';
import Header from '../components/Header';
import {
  fetchDrinkCategories,
  fetchDrinks,
  fetchDrinksByCategory,
} from '../services/fetchDrinks';

function MainDrinkRecipes({ location }) {
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [drinkRecipes, setDrinkRecipes] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');

  useEffect(() => {
    const getCategoriesAndDrinks = async () => {
      const categories = await fetchDrinkCategories();
      setDrinkCategories(categories);

      const drinks = await fetchDrinks();
      setDrinkRecipes(drinks);
    };
    getCategoriesAndDrinks();
  }, []);

  const handleCategory = async ({ target }) => {
    if (target.innerHTML === currentCategory || target.innerHTML === 'All') {
      const meals = await fetchDrinks();
      setDrinkRecipes(meals);
      setCurrentCategory('');
    } else {
      const drinks = await fetchDrinksByCategory(target.innerHTML);
      setDrinkRecipes(drinks);
      setCurrentCategory(target.innerHTML);
    }
  };

  return (
    <>
      <Header location={ location.pathname } />
      <section>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ handleCategory }
        >
          All
        </button>
        {drinkCategories.map(({ strCategory }) => (
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
        {drinkRecipes.map((drink, index) => (
          <DrinkCard key={ drink.idDrink } drink={ drink } index={ index } />
        ))}
      </section>
    </>
  );
}

MainDrinkRecipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default MainDrinkRecipes;
