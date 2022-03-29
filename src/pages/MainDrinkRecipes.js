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

function MainDrinkRecipes({ history, location }) {
  const { currentRecipes, setCurrentRecipes } = useContext(RecipesContext);

  const [drinkCategories, setDrinkCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');

  useEffect(() => {
    const getCategoriesAndDrinks = async () => {
      const categories = await fetchDrinkCategories();
      setDrinkCategories(categories);

      const drinks = await fetchDrinks();
      setCurrentRecipes(drinks);
    };
    getCategoriesAndDrinks();
  }, [setCurrentRecipes]);

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
        {currentRecipes.map((drink, index) => (
          <DrinkCard key={ drink.idDrink } drink={ drink } index={ index } />
        ))}
      </section>
      <Footer />
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
