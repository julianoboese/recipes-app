import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchMealRandomly } from '../services/fetchMeals';
import { fetchDrinkRandomly } from '../services/fetchDrinks';

function ExploreFood({ history, location }) {
  const URL = location.pathname;
  const NOT_FOUND = -1;
  const foodCondition = URL.indexOf('foods') !== NOT_FOUND;

  const randomRecipe = async () => {
    if (foodCondition) {
      const recipes = await fetchMealRandomly();
      history.push(`/foods/${recipes[0].idMeal}`);
    } else {
      const recipes = await fetchDrinkRandomly();
      history.push(`/drinks/${recipes[0].idDrink}`);
    }
  };

  return (
    <div>
      <Header location={ URL } history={ history } />
      <main>
        <Link
          to={
            foodCondition
              ? '/explore/foods/ingredients'
              : '/explore/drinks/ingredients'
          }
        >
          <button type="button" data-testid="explore-by-ingredient">
            By Ingredient
          </button>
        </Link>
        { foodCondition && (
          <Link to="/explore/foods/nationalities">
            <button type="button" data-testid="explore-by-nationality">
              By Nationality
            </button>
          </Link>
        )}
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ randomRecipe }
        >
          Surprise me!
        </button>
      </main>
      <Footer />
    </div>
  );
}

ExploreFood.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default ExploreFood;
