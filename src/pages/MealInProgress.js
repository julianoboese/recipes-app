import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { fetchMealById } from '../services/fetchMeals';
import ShareBtn from '../components/ShareBtn';
import FavoriteBtn from '../components/FavoriteBtn';
import Home from '../components/Home';
import RecipeInProgress from '../default_styles/RecipeInProgressStyle';

function MealInProgress({ history, match }) {
  const { params: { recipeId } } = match;

  const [mealInProgress, setMealInProgress] = useState({});
  const [inProgressRecipes, setInProgressRecipes] = useState({});
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { strMeal, strMealThumb, strArea, strTags, strCategory,
    strInstructions } = mealInProgress;
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
      const storedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
        || { cocktails: {}, meals: {} };
      setInProgressRecipes(storedRecipes);

      const storedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
      setDoneRecipes(storedDoneRecipes);
      setIsLoading(false);
    };
    getRecipe();
  }, [recipeId, setDoneRecipes]);

  const handleChange = ({ target }) => {
    const storedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'))
      || { cocktails: {}, meals: {} };
    if (target.checked) {
      const newProgress = {
        ...storedRecipes,
        meals: {
          ...storedRecipes.meals,
          [recipeId]: storedRecipes.meals[recipeId] ? [
            ...storedRecipes.meals[recipeId],
            target.value,
          ] : [target.value],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newProgress));
      setInProgressRecipes(newProgress);
    } else {
      const newProgress = {
        ...storedRecipes,
        meals: {
          ...storedRecipes.meals,
          [recipeId]: storedRecipes.meals[recipeId]
            .filter((ingredient) => ingredient !== target.value),
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newProgress));
      setInProgressRecipes(newProgress);
    }
  };

  const handleCheck = (ingredient) => {
    if (inProgressRecipes.meals) {
      return inProgressRecipes.meals[recipeId]
        && inProgressRecipes.meals[recipeId].includes(ingredient);
    }
    return false;
  };

  const handleDisabled = () => {
    if (inProgressRecipes.meals) {
      return inProgressRecipes.meals[recipeId]
        ? ingredients.length !== inProgressRecipes.meals[recipeId].length
        : true;
    }
    return true;
  };

  const handleFinish = () => {
    const newDoneRecipe = {
      id: recipeId,
      type: 'food',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: '',
      tags: strTags.split(','),
    };
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, newDoneRecipe]));
    setDoneRecipes([...doneRecipes, newDoneRecipe]);
    history.push('/done-recipes');
  };

  return (
    <RecipeInProgress>
      {!isLoading
      && (
        <>
          <Home history={ history } />
          <section className="header-title">
            <img
              className="food-thumbnail"
              src={ strMealThumb }
              alt={ strMeal }
              data-testid="recipe-photo"
            />
            <div className="title-box">
              <h1 data-testid="recipe-title">{strMeal}</h1>
              ●
              <p data-testid="recipe-category">{strCategory}</p>
            </div>
          </section>

          <section className="action-buttons">
            <FavoriteBtn recipe={ mealInProgress } type="food" />
            <ShareBtn type="foods" id={ recipeId } />
          </section>

          <section className="instructions-section">
            <h3>Instructions</h3>
            <p data-testid="instructions">{strInstructions}</p>
          </section>

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
            className="start-button"
            data-testid="finish-recipe-btn"
            disabled={ handleDisabled() }
            onClick={ handleFinish }
          >
            Finish
          </button>
        </>
      )}
    </RecipeInProgress>
  );
}

MealInProgress.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
  }).isRequired,
};

export default MealInProgress;
