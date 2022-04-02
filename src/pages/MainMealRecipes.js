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
  const { currentRecipes, setCurrentRecipes, ingredients, setIngredients,
    searchResults, setSearchResults } = useContext(RecipesContext);

  const [mealCategories, setMealCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => setSearchResults([]), [setSearchResults]);

  useEffect(() => {
    const getCategoriesAndMeals = async () => {
      const categories = await fetchMealCategories();
      setMealCategories(categories);

      if (searchResults.length > 0) {
        setCurrentRecipes(searchResults);
      } else if (ingredients.length > 0) {
        setCurrentRecipes(ingredients);
      } else {
        const meals = await fetchMeals();
        setCurrentRecipes(meals);
      }
      setIsLoading(false);
    };
    getCategoriesAndMeals();
  }, [setCurrentRecipes, ingredients, searchResults]);

  useEffect(() => () => {
    setSearchResults([]);
    setIngredients([]);
  }, [setIngredients, setSearchResults]);

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
              <MealCard key={ index } meal={ meal } index={ index } />
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
