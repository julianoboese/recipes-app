import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function MealCard({ meal, index }) {
  const { idMeal, strMeal, strMealThumb } = meal;

  return (
    (
      <Link className="card-item" to={ `/foods/${idMeal}` }>
        <div data-testid={ `${index}-recipe-card` }>
          <img
            className="img-item"
            src={ strMealThumb }
            alt={ strMeal }
            data-testid={ `${index}-card-img` }
          />
          <p className="card-p" data-testid={ `${index}-card-name` }>{strMeal}</p>
        </div>
      </Link>
    )
  );
}

MealCard.propTypes = {
  meal: PropTypes.shape({
    idMeal: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default MealCard;
