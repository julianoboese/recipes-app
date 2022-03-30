import React, { useState } from 'react';
import favoriteIcon from '../images/blackHeartIcon.svg';
import notFavoriteIcon from '../images/whiteHeartIcon.svg';

function FavoriteBtn() {
  const [isFavorited, setIsFavorited] = useState(false);

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
      onClick={ () => setIsFavorited(!isFavorited) }
    >
      {heartFavorited()}
    </button>
  );
}

export default FavoriteBtn;
