import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [currentRecipes, setCurrentRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  return (
    <RecipesContext.Provider
      value={ { currentRecipes,
        setCurrentRecipes,
        ingredients,
        setIngredients,
        searchResults,
        setSearchResults,
      } }
    >
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
