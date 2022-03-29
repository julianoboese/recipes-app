import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const context = {};
  const [currentRecipes, setCurrentRecipes] = useState('');

  const setNewRecipes = (recipes) => {
    setCurrentRecipes(recipes);
  };

  return (
    <RecipesContext.Provider value={ { context, currentRecipes, setNewRecipes } }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
