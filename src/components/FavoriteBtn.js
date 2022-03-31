/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import favoriteIcon from '../images/blackHeartIcon.svg';
import notFavoriteIcon from '../images/whiteHeartIcon.svg';

function FavoriteBtn({ recipe, type }) {
  console.log(recipe, type);
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
      const actualFavorite = favorites
        .some((item) => item.id === generalFavorite.id);
      setIsFavorited(actualFavorite);
    }
  }, [createItemObj]);

  const heartFavorited = () => {
    if (isFavorited) {
      return (<img
        src={ favoriteIcon }
        data-testid="favorite-btn"
        alt="ícone de favorito"
      />);
    }
    return (<img
      src={ notFavoriteIcon }
      data-testid="favorite-btn"
      alt="ícone de não favorito"
    />);
  };

  const insertIntoFavorites = (newObj) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites) {
      const newFavorites = [...favorites, newObj];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      return;
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify([newObj]));
  };

  const removeFromFavorites = (newObj) => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = favorites.filter((favorite) => favorite.id !== newObj.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  };

  const handleFavoriteClick = () => {
    const newObj = createItemObj();
    if (!isFavorited) {
      insertIntoFavorites(newObj);
    }
    if (isFavorited) {
      removeFromFavorites(newObj);
    }
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
