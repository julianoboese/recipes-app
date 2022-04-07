import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';
import { fetchMealIngredients, fetchMealByIngredients } from '../services/fetchMeals';
import { fetchDrinkIngredients, fetchDrinkByIngredients } from '../services/fetchDrinks';
import RecipesContext from '../context/RecipesContext';
import IngredientStyled from '../default_styles/IngredientCardStyled';

function ExploreIngredients({ history, location }) {
  const [allIngredients, setAllIngredients] = useState([]);
  const { setIngredients } = useContext(RecipesContext);

  const URL = location.pathname;
  const NOT_FOUND = -1;
  const foodCondition = URL.indexOf('foods') !== NOT_FOUND;

  useEffect(() => {
    const loadAllIngredients = async () => {
      if (foodCondition) {
        const ingredients = await fetchMealIngredients();
        setAllIngredients(ingredients);
      } else {
        const ingredients = await fetchDrinkIngredients();
        setAllIngredients(ingredients);
      }
    };
    loadAllIngredients();
  }, [foodCondition]);

  const showRecipesByIngredient = async (name) => {
    const MAX_RECIPES = 12;
    if (foodCondition) {
      const ingredients = await fetchMealByIngredients(name);
      setSearchResults([]);
      setIngredients(ingredients.splice(0, MAX_RECIPES));
      history.push('/foods');
    } else {
      const ingredients = await fetchDrinkByIngredients(name);
      setSearchResults([]);
      setIngredients(ingredients.splice(0, MAX_RECIPES));
      history.push('/drinks');
    }
  };

  return (
    <div>
      <Header location={ URL } history={ history } />
      <IngredientStyled>
        { allIngredients.map(({ strIngredient1: name, strIngredient }, index) => (
          <IngredientCard
            onClick={ foodCondition
              ? () => showRecipesByIngredient(strIngredient)
              : () => showRecipesByIngredient(name) }
            src={ foodCondition
              ? `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`
              : `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png` }
            key={ foodCondition ? strIngredient : name }
            name={ foodCondition ? strIngredient : name }
            index={ index }
          />
        ))}
      </IngredientStyled>
      <Footer history={ history } />
    </div>
  );
}

ExploreIngredients.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default ExploreIngredients;
