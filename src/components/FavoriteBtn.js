/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import favoriteIcon from '../images/blackHeartIcon.svg';
import notFavoriteIcon from '../images/whiteHeartIcon.svg';

function FavoriteBtn({ recipe, type }) {
  const [isFavorited, setIsFavorited] = useState(false);

  const createItemObj = () => {
    if (type === 'food') {
      const item = {
        id: recipe.idMeal,
        type,
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      };
      return item;
    }
    if (type === 'drink') {
      const item = {
        id: recipe.idDrink,
        type,
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      };
      return item;
    }
  };

  useEffect(() => {
    const generalFavorite = createItemObj();
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites) {
      const atcualFavorite = favorites
        .some((item) => item.id === generalFavorite.id);
      setIsFavorited(atcualFavorite);
    }
  }, []);

  const heartFavorited = () => {
    if (isFavorited) {
      return (<img
        src={ favoriteIcon }
        data-testid="favorite-btn"
        alt="icone de favorito"
      />);
    }
    return (<img
      src={ notFavoriteIcon }
      data-testid="favorite-btn"
      alt="icone de não favorito"
    />);
  };

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={ handleFavoriteClick }
    >
      {heartFavorited()}
    </button>
  );
}

FavoriteBtn.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default FavoriteBtn;
