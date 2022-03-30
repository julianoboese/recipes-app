import React, { useContext, useEffect } from 'react';
import DoneCard from '../components/DoneCard';
import RecipesContext from '../context/RecipesContext';

function DoneRecipes() {
  const { doneRecipes, setDoneRecipes } = useContext(RecipesContext);

  useEffect(() => {
    const storedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    console.log(storedDoneRecipes);
    setDoneRecipes(storedDoneRecipes);
  }, [setDoneRecipes]);

  return (
    <div>
      {doneRecipes.map((recipe, index) => (
        <DoneCard recipe={ recipe } index={ index } key={ recipe.id } />
      ))}
    </div>
  );
}

export default DoneRecipes;
