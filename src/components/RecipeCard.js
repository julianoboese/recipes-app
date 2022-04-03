import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe, index }) {
  let recipeId;
  let recipeName;
  let recipeImg;

  if (recipe.idMeal) {
    recipeId = recipe.idMeal;
    recipeName = recipe.strMeal;
    recipeImg = recipe.strMealThumb;
  } else {
    recipeId = recipe.idDrink;
    recipeName = recipe.strDrink;
    recipeImg = recipe.strDrinkThumb;
  }

  return (
    (
      <Link to={ `/${recipe.idMeal ? 'foods' : 'drinks'}/${recipeId}` }>
        <div className="w-25" data-testid={ `${index}-recipe-card` }>
          <img
            className="img-thumbnail"
            src={ recipeImg }
            alt={ recipeName }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{recipeName}</p>
        </div>
      </Link>
    )
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    idDrink: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RecipeCard;
