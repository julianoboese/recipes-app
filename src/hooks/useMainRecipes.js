import { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import { fetchDrinkCategories, fetchDrinks } from '../services/fetchDrinks';
import { fetchMealCategories, fetchMeals } from '../services/fetchMeals';

function useMainRecipes(currentPage) {
  const { setCurrentRecipes, ingredients, setIngredients,
    searchResults, setSearchResults } = useContext(RecipesContext);

  const [recipeCategories, setRecipeCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSearchResults([]);

    return () => {
      setSearchResults([]);
      setIngredients([]);
    };
  }, [setIngredients, setSearchResults]);

  useEffect(() => {
    const getCategoriesAndRecipes = async () => {
      if (currentPage === '/foods') {
        const categories = await fetchMealCategories();
        setRecipeCategories(categories);
      } else {
        const categories = await fetchDrinkCategories();
        setRecipeCategories(categories);
      }

      if (searchResults.length > 0) {
        setCurrentRecipes(searchResults);
      } else if (ingredients.length > 0) {
        setCurrentRecipes(ingredients);
      } else if (currentPage === '/foods') {
        const recipes = await fetchMeals();
        setCurrentRecipes(recipes);
      } else {
        const recipes = await fetchDrinks();
        setCurrentRecipes(recipes);
      }
      setIsLoading(false);
    };
    getCategoriesAndRecipes();
  }, [setCurrentRecipes, ingredients, searchResults, currentPage]);

  return [recipeCategories, isLoading];
}

export default useMainRecipes;
