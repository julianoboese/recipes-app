import React from 'react';

function StartRecipeBtn() {
  return (
    <button
      type="button"
      className="btn btn-primary fixed-bottom"
      data-testid="start-recipe-btn"
    >
      Start Recipe
    </button>
  );
}

export default StartRecipeBtn;
