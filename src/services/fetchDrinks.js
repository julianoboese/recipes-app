export const fetchDrinkCategories = async () => {
  const MAX_CATEGORIES = 5;
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const responseJson = await response.json();
  return responseJson.drinks.slice(0, MAX_CATEGORIES);
};

export const fetchDrinks = async () => {
  const MAX_RECIPES = 12;
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const responseJson = await response.json();
  return responseJson.drinks.slice(0, MAX_RECIPES);
};

export const fetchDrinksByCategory = async (category) => {
  const MAX_RECIPES = 12;
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const responseJson = await response.json();
  return responseJson.drinks.slice(0, MAX_RECIPES);
};

export const fetchDrinkById = async (id) => {
  const response = await fetch(`www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const responseJson = await response.json();
  return responseJson.meals[0];
};
