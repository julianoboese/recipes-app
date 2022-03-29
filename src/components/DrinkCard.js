import PropTypes from 'prop-types';
import React from 'react';

function DrinkCard({ drink, index }) {
  const { idDrink, strDrink, strDrinkThumb } = drink;

  return (
    (
      <div key={ idDrink } data-testid={ `${index}-recipe-card` }>
        <img src={ strDrinkThumb } alt={ strDrink } data-testid={ `${index}-card-img` } />
        <p data-testid={ `${index}-card-name` }>{strDrink}</p>
      </div>
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
