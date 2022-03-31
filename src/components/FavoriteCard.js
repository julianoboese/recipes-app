import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import FavoriteBtn from './FavoriteBtn';

function FavoriteCard({ recipe, index }) {
  // const [isLoading, setIsLoading] = useState(true);
  const [favoriteRecipe, setFavoriteRecipe] = useState({});
  const { id, type, category, nationality, alcoholicOrNot, name, image } = recipe;

  useEffect(() => {
    const initialRecipe = () => {
      setFavoriteRecipe(recipe);
    };
    initialRecipe();
  }, [recipe]);

  const [isShared, setIsShared] = useState(false);

  return (
    <div className="w-25">
      <Link to={ `/${type}s/${id}` }>
        <img
          className="img-thumbnail"
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <Link to={ `/${type}s/${id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>
      <button
        type="button"
        src={ shareIcon }
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => {
          navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
          setIsShared(true);
        } }
      >
        share
      </button>
      {isShared && <p>Link copied!</p>}
      <p data-testid={ `${index}-horizontal-top-text` }>
        {type === 'food' ? `${nationality} - ${category}` : alcoholicOrNot}
      </p>
      {Object.keys(favoriteRecipe).length > 0 && <FavoriteBtn
        recipe={ favoriteRecipe }
        type={ type }
      />}
    </div>
  );
}

FavoriteCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    nationality: PropTypes.string,
  }).isRequired,
};

export default FavoriteCard;
