import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function StartRecipeBtn({ id, type }) {
  const [recipeStatus, setRecipeStatus] = useState('Start Recipe');
  let redirectUrl = `/foods/${id}/in-progress`;
  if (type === 'cocktails') {
    redirectUrl = `/drinks/${id}/in-progress`;
  }
  useEffect(() => {
    const getRecipeProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!getRecipeProgress) return;
    const progressOfId = getRecipeProgress[type][id];
    if (progressOfId) setRecipeStatus('Continue Recipe');
  }, [id, type]);

  return (
    <Link to={ redirectUrl } className="link-start-btn">

      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-button"
      >
        {recipeStatus}
      </button>
    </Link>
  );
}

StartRecipeBtn.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default StartRecipeBtn;
