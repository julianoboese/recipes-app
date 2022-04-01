import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function DrinkCard({ drink, index }) {
  const { idDrink, strDrink, strDrinkThumb } = drink;

  return (
    (
      <Link className="card-item" to={ `/drinks/${idDrink}` }>
        <div className="w-25" data-testid={ `${index}-recipe-card` }>
          <img
            className="img-item"
            src={ strDrinkThumb }
            alt={ strDrink }
            data-testid={ `${index}-card-img` }
          />
          <p className="card-p" data-testid={ `${index}-card-name` }>{strDrink}</p>
        </div>
      </Link>
    )
  );
}

DrinkCard.propTypes = {
  drink: PropTypes.shape({
    idDrink: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default DrinkCard;
