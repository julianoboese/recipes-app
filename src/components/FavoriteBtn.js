import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHearth } from '@fortawesome/free-regular-svg-icons';
// import notFavoriteIcon from '../images/whiteHeartIcon.svg';
// import favoriteIcon from '../images/blackHeartIcon.svg';

function FavoriteBtn({ recipe, type }) {
  const [isFavorited, setIsFavorited] = useState(false);
  // const [dataTestId, setdataTestId] = useState('favorite-btn');
  const [isLoading, setIsLoading] = useState(true);

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
    if (type === 'favorite') return recipe;
  };

  const generalFavorite = createItemObj();
  useEffect(() => {
    if (recipe.index || recipe.index === 0) {
      setdataTestId(`${recipe.index}-horizontal-favorite-btn`);
    }
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites) {
      const actualFavorite = favorites
        .some((item) => item.id === generalFavorite.id);
      setIsFavorited(actualFavorite);
    }
    setIsLoading(false);
  }, [generalFavorite.id, recipe.index]);

  const heartFavorited = () => {
    if (isFavorited) {
      return (<FontAwesomeIcon icon={ faHeart } />);
    }
    return (<FontAwesomeIcon icon={ regularHearth } />);
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
      {!isLoading && heartFavorited()}
    </button>
  );
}

FavoriteBtn.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    idDrink: PropTypes.string,
    idMeal: PropTypes.string,
    index: PropTypes.number,
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
