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
      className="card-item"
    >
      <img
        src={ src }
        alt={ name }
        data-testid={ `${index}-card-img` }
        className="img-item"
      />
      <p className="card-p" data-testid={ `${index}-card-name` }>{ name }</p>
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
