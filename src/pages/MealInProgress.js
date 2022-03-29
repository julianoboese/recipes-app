import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { fetchMealById } from '../services/fetchMeals';

function MealInProgress({ match }) {
  const [mealInProgress, setMealInProgress] = useState({});

  const { params: { recipeId } } = match;

  useEffect(() => {
    const getRecipe = async () => {
      const meal = await fetchMealById(recipeId);
      setMealInProgress(meal);
    };
    getRecipe();
  }, [recipeId]);

  const { strMeal, strMealThumb, strCategory, strInstructions } = mealInProgress;
  const ingredients = Object.entries(mealInProgress).reduce((acc, [key, value]) => {
    if (key.includes('strIngredient') && value) {
      return [...acc, value];
    }
    return acc;
  }, []);

  return (
    <div>
      <img src={ strMealThumb } alt={ strMeal } data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{strMeal}</h2>
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

MealInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
  }).isRequired,
};

export default MealInProgress;
