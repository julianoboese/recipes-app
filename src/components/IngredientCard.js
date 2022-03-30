import React from 'react';
import PropTypes from 'prop-types';

function IngredientCard({ name, index, src, onClick }) {
  return (
    <div
      data-testid={ `${index}-ingredient-card` }
      onClick={ onClick }
      onKeyPress={ onClick }
      tabIndex={ 0 }
      role="button"
    >
      <img
        src={ src }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>{ name }</p>
    </div>
  );
}

IngredientCard.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IngredientCard;
