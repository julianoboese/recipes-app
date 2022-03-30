import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import { fetchMealById } from '../services/fetchMeals';

function MealInProgress({ match }) {
  const { params: { recipeId } } = match;

  const { inProgressRecipes, setInProgressRecipes } = useContext(RecipesContext);
  const [mealInProgress, setMealInProgress] = useState({});

  const { strMeal, strMealThumb, strCategory, strInstructions } = mealInProgress;
  const ingredients = Object.entries(mealInProgress).reduce((acc, [key, value]) => {
    if (key.includes('strIngredient') && value) {
      return [...acc, value];
    }
    return acc;
  }, []);

  useEffect(() => {
    const getRecipe = async () => {
      const meal = await fetchMealById(recipeId);
      setMealInProgress(meal);
    };
    getRecipe();
    const storedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storedRecipes) {
      setInProgressRecipes(storedRecipes);
    }
  }, [recipeId, setInProgressRecipes]);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [inProgressRecipes]);

  const handleChange = ({ target }) => {
    if (target.checked) {
      setInProgressRecipes(
        {
          ...inProgressRecipes,
          meals: {
            ...inProgressRecipes.meals,
            [recipeId]: inProgressRecipes.meals[recipeId] ? [
              ...inProgressRecipes.meals[recipeId],
              target.value,
            ] : [target.value],
          },
        },
      );
    } else {
      setInProgressRecipes({
        ...inProgressRecipes,
        meals: {
          ...inProgressRecipes.meals,
          [recipeId]: inProgressRecipes.meals[recipeId]
            .filter((ingredient) => ingredient !== target.value),
        },
      });
    }
  };

  return (
    <div>
      <img src={ strMealThumb } alt={ strMeal } data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{strMeal}</h2>
      <h3 data-testid="recipe-category">{strCategory}</h3>
      <button type="button" data-testid="share-btn">Share</button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <p data-testid="instructions">{strInstructions}</p>
      {ingredients.map((ingredient, index) => {
        const isChecked = inProgressRecipes.meals[recipeId]
          && inProgressRecipes.meals[recipeId].includes(ingredient);

        return (
          <label
            htmlFor={ ingredient }
            key={ ingredient }
            data-testid={ `${index}-ingredient-step` }
            style={ { textDecoration: isChecked ? 'line-through' : 'none' } }
          >
            <input
              type="checkbox"
              value={ ingredient }
              id={ ingredient }
              checked={ isChecked }
              onChange={ handleChange }
            />
            {ingredient}
          </label>
        );
      })}
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
