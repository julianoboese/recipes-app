import React, { useState, useEffect } from 'react';
import DoneCard from '../components/DoneCard';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    const storedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipes(storedDoneRecipes);
  }, []);

  return (
    <div>
      <section>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setTypeFilter('') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setTypeFilter('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setTypeFilter('drink') }
        >
          Drinks
        </button>
      </section>
      <section>
        {doneRecipes.filter((recipe) => {
          if (!typeFilter) {
            return true;
          }
          return recipe.type === typeFilter;
        }).map((recipe, index) => (
          <DoneCard recipe={ recipe } index={ index } key={ recipe.id } />
        ))}
      </section>
    </div>
  );
}

export default DoneRecipes;
