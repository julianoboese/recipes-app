import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function DrinkCard({ drink, index }) {
  const { idDrink, strDrink, strDrinkThumb } = drink;

  return (
    (
      <Link
        to={ `/drinks/${idDrink}` }
        key={ idDrink }
        data-testid={ `${index}-recipe-card` }
      >
        <img src={ strDrinkThumb } alt={ strDrink } data-testid={ `${index}-card-img` } />
        <p data-testid={ `${index}-card-name` }>{strDrink}</p>
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
