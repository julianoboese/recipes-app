import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [currentRecipes, setCurrentRecipes] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState({});

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [inProgressRecipes]);

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
