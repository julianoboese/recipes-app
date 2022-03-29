import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { fetchDrinkById } from '../services/fetchDrinks';

function DrinkInProgress({ match }) {
  const [drinkInProgress, setDrinkInProgress] = useState({});

  const { params: { recipeId } } = match;

  useEffect(() => {
    const getRecipe = async () => {
      const drink = await fetchDrinkById(recipeId);
      setDrinkInProgress(drink);
    };
    getRecipe();
  }, [recipeId]);

  const { strDrink, strDrinkThumb, strCategory, strInstructions } = drinkInProgress;
  const ingredients = Object.entries(drinkInProgress).reduce((acc, [key, value]) => {
    if (key.includes('strIngredient') && value) {
      return [...acc, value];
    }
    return acc;
  }, []);

  return (
    <div>
      <img src={ strDrinkThumb } alt={ strDrink } data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{strDrink}</h2>
      <h3 data-testid="recipe-category">{strCategory}</h3>
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <p data-testid="instructions">{strInstructions}</p>
      {ingredients.map((ingredient, index) => (
        <label
          htmlFor={ ingredient }
          key={ ingredient }
          data-testid={ `${index}-ingredient-step` }
        >
          <input type="checkbox" value={ ingredient } id={ ingredient } />
          {ingredient}
        </label>
      ))}
      <button type="button" data-testid="finish-recipe-btn">Finish</button>
    </div>
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinkInProgress;
