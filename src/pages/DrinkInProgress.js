import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import { fetchDrinkById } from '../services/fetchDrinks';
import ShareBtn from '../components/ShareBtn';

function DrinkInProgress({ history, match }) {
  const { params: { recipeId } } = match;

  const { doneRecipes, setDoneRecipes } = useContext(RecipesContext);
  const [drinkInProgress, setDrinkInProgress] = useState({});
  const [inProgressRecipes, setInProgressRecipes] = useState({});

  const { strDrink, strDrinkThumb, strAlcoholic, strCategory,
    strInstructions } = drinkInProgress;
  const ingredients = Object.entries(drinkInProgress).reduce((acc, [key, value]) => {
    if (key.includes('strIngredient') && value) {
      return [...acc, value];
    }
    return acc;
  }, []);

  useEffect(() => {
    const getRecipe = async () => {
      const drink = await fetchDrinkById(recipeId);
      setDrinkInProgress(drink);
    };
    getRecipe();

    const storedInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
      || { cocktails: {}, meals: {} };
    setInProgressRecipes(storedInProgressRecipes);

    const storedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipes(storedDoneRecipes);
  }, [recipeId, setInProgressRecipes, setDoneRecipes]);

  const handleChange = ({ target }) => {
    const storedInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
      || { cocktails: {}, meals: {} };
    if (target.checked) {
      const newProgress = {
        ...storedInProgressRecipes,
        cocktails: {
          ...storedInProgressRecipes.cocktails,
          [recipeId]: storedInProgressRecipes.cocktails[recipeId] ? [
            ...storedInProgressRecipes.cocktails[recipeId],
            target.value,
          ] : [target.value],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newProgress));
      setInProgressRecipes(newProgress);
    } else {
      const newProgress = {
        ...storedInProgressRecipes,
        cocktails: {
          ...storedInProgressRecipes.cocktails,
          [recipeId]: storedInProgressRecipes.cocktails[recipeId]
            .filter((ingredient) => ingredient !== target.value),
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newProgress));
      setInProgressRecipes(newProgress);
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

  const handleFinish = () => {
    setDoneRecipes([...doneRecipes, {
      id: recipeId,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: '',
      tags: [],
    }]);
    history.push('/done-recipes');
  };

  return (
    <div>
      <img src={ strDrinkThumb } alt={ strDrink } data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{strDrink}</h2>
      <h3 data-testid="recipe-category">{strCategory}</h3>
      <ShareBtn type="drinks" id={ recipeId } />
      <button type="button" data-testid="favorite-btn">Favorite</button>

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
        onClick={ handleFinish }
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
