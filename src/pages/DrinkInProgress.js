import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import { fetchDrinkById } from '../services/fetchDrinks';
import shareIcon from '../images/shareIcon.svg';

function DrinkInProgress({ history, match }) {
  const { params: { recipeId } } = match;

  const { inProgressRecipes, setInProgressRecipes } = useContext(RecipesContext);
  const [drinkInProgress, setDrinkInProgress] = useState({});
  const [isShared, setIsShared] = useState(false);

  const { strDrink, strDrinkThumb, strCategory, strInstructions } = drinkInProgress;
  const ingredients = Object.entries(drinkInProgress).reduce((acc, [key, value]) => {
    if (key.includes('strIngredient') && value) {
      return [...acc, value];
    }
    return acc;
  }, []);

  useEffect(() => {
    setInProgressRecipes({
      cocktails: {},
      meals: {},
    });
    const getRecipe = async () => {
      const drink = await fetchDrinkById(recipeId);
      setDrinkInProgress(drink);
    };
    getRecipe();
    const storedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storedRecipes) {
      setInProgressRecipes(storedRecipes);
    }
  }, [recipeId, setInProgressRecipes]);

  const handleChange = ({ target }) => {
    if (target.checked) {
      setInProgressRecipes(
        {
          ...inProgressRecipes,
          cocktails: {
            ...inProgressRecipes.cocktails,
            [recipeId]: inProgressRecipes.cocktails[recipeId] ? [
              ...inProgressRecipes.cocktails[recipeId],
              target.value,
            ] : [target.value],
          },
        },
      );
    } else {
      setInProgressRecipes({
        ...inProgressRecipes,
        cocktails: {
          ...inProgressRecipes.cocktails,
          [recipeId]: inProgressRecipes.cocktails[recipeId]
            .filter((ingredient) => ingredient !== target.value),
        },
      });
    }
  };

  const handleCheck = (ingredient) => {
    if (inProgressRecipes.cocktails) {
      return inProgressRecipes.cocktails[recipeId]
        && inProgressRecipes.cocktails[recipeId].includes(ingredient);
    }
    return false;
  };

  const handleDisabled = () => {
    if (inProgressRecipes.cocktails) {
      return inProgressRecipes.cocktails[recipeId]
        ? ingredients.length !== inProgressRecipes.cocktails[recipeId].length
        : true;
    }
    return true;
  };

  return (
    <div>
      <img src={ strDrinkThumb } alt={ strDrink } data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{strDrink}</h2>
      <h3 data-testid="recipe-category">{strCategory}</h3>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          navigator.clipboard.writeText(`http://localhost:3000/drinks/${recipeId}`);
          setIsShared(true);
        } }
      >
        <img src={ shareIcon } alt="ícone para compartilhar" />
      </button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      {isShared && <p>Link copied!</p>}

      <p data-testid="instructions">{strInstructions}</p>
      {ingredients.map((ingredient, index) => {
        const isChecked = handleCheck(ingredient);

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
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ handleDisabled() }
        onClick={ () => history.push('/done-recipes') }
      >
        Finish
      </button>
    </div>
  );
}

DrinkInProgress.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinkInProgress;
