import React, { useState, useEffect } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedFavoriteRecipes = JSON.parse(localStorage
      .getItem('favoriteRecipes')) || [];
    setFavoriteRecipes(storedFavoriteRecipes);
    setIsLoading(false);
  }, []);

  return (
    <div>
      <Header />
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
        {favoriteRecipes.filter((recipe) => {
          if (!typeFilter) {
            return true;
          }
          return recipe.type === typeFilter;
        }).map((recipe, index) => (
          !isLoading && <FavoriteCard
            recipe={ recipe }
            index={ index }
            key={ recipe.id }
          />
        ))}
      </section>
    </div>
  );
}

export default FavoriteRecipes;
