import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { fetchDrinkById } from '../services/fetchDrinks';
import ShareBtn from '../components/ShareBtn';
import FavoriteBtn from '../components/FavoriteBtn';

function DrinkInProgress({ history, match }) {
  const { params: { recipeId } } = match;

  const [drinkInProgress, setDrinkInProgress] = useState({});
  const [inProgressRecipes, setInProgressRecipes] = useState({});
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      const storedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
        || { cocktails: {}, meals: {} };
      setInProgressRecipes(storedRecipes);

      const storedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
      setDoneRecipes(storedDoneRecipes);
      setIsLoading(false);
    };
    getRecipe();
  }, [recipeId, setInProgressRecipes, setDoneRecipes]);

  const handleChange = ({ target }) => {
    const storedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
      || { cocktails: {}, meals: {} };
    if (target.checked) {
      const newProgress = {
        ...storedRecipes,
        cocktails: {
          ...storedRecipes.cocktails,
          [recipeId]: storedRecipes.cocktails[recipeId] ? [
            ...storedRecipes.cocktails[recipeId],
            target.value,
          ] : [target.value],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newProgress));
      setInProgressRecipes(newProgress);
    } else {
      const newProgress = {
        ...storedRecipes,
        cocktails: {
          ...storedRecipes.cocktails,
          [recipeId]: storedRecipes.cocktails[recipeId]
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
    const newDoneRecipe = {
      id: recipeId,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: '',
      tags: [],
    };
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, newDoneRecipe]));
    setDoneRecipes([...doneRecipes, newDoneRecipe]);
    history.push('/done-recipes');
  };

  return (
    <div>
      {!isLoading
      && (
        <>
          <img src={ strDrinkThumb } alt={ strDrink } data-testid="recipe-photo" />
          <h2 data-testid="recipe-title">{strDrink}</h2>
          <h3 data-testid="recipe-category">{strCategory}</h3>
          <FavoriteBtn recipe={ drinkInProgress } type="drink" />
          <ShareBtn type="drinks" id={ recipeId } />

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
        </>
      )}
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
