import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [currentRecipes, setCurrentRecipes] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState({
    cocktails: {},
    meals: {},
  });

  return (
    <RecipesContext.Provider
      value={ { currentRecipes,
        setCurrentRecipes,
        inProgressRecipes,
        setInProgressRecipes } }
    >
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
