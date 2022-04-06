import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import shareIcon from '../images/shareIcon.svg';
import FavoriteBtn from './FavoriteBtn';
// import { fetchMealById } from '../services/fetchMeals';

function FavoriteCard({ recipe, index }) {
  const { id, type, category, nationality, alcoholicOrNot, name, image } = recipe;
  recipe.index = index;
  const [isShared, setIsShared] = useState(false);

  return (
    <div className="card">
      <Link to={ `/${type}s/${id}` } className="card-image-container">
        <img
          className="card-image"
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <Link to={ `/${type}s/${id}` }>
        <p data-testid={ `${index}-horizontal-name` } className="card-title">
          {name}
        </p>
      </Link>
      <button
        type="button"
        src={ shareIcon }
        data-testid={ `${index}-horizontal-share-btn` }
        className="share-btn"
        onClick={ () => {
          navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
          setIsShared(true);
        } }
      >
        <FontAwesomeIcon icon={ faCopy } />
      </button>
      {isShared && global.alert('Link Copied!')}
      <p data-testid={ `${index}-horizontal-top-text` } className="card-description">
        {type === 'food' ? `${nationality} - ${category}` : alcoholicOrNot}
      </p>
      <FavoriteBtn
        data-testid="0-horizontal-favorite-btn"
        recipe={ recipe }
        type="favorite"
      />

    </div>
  );
}

FavoriteCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string,
    category: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    index: PropTypes.number,
    name: PropTypes.string,
    nationality: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default FavoriteCard;
