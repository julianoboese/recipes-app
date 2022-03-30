import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import favoriteIcon from '../images/blackHeartIcon.svg';
import notFavoriteIcon from '../images/whiteHeartIcon.svg';

function FavoriteBtn({ recipe }, type) {
  console.log(recipe, type);
  const [isFavorited, setIsFavorited] = useState(false);
  // const [favorite, setFavorite] = useState({})

  useEffect(() => {
    // const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    // setFavorite(favorites.)
  }, []);

  const heartFavorited = () => {
    if (isFavorited) {
      return <img src={ favoriteIcon } alt="icone de favorito" />;
    }
    return <img src={ notFavoriteIcon } alt="icone de não favorito" />;
  };

  return (
    <button
      type="button"
      className="btn btn-primary"
      data-testid="favorite-btn"
      onClick={ () => setIsFavorited(!isFavorited) }
    >
      {heartFavorited()}
    </button>
  );
}

FavoriteBtn.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default FavoriteBtn;
