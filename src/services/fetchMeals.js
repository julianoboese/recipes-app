export const fetchMealCategories = async () => {
  const MAX_CATEGORIES = 5;
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const responseJson = await response.json();
  return responseJson.meals.slice(0, MAX_CATEGORIES);
};

export const fetchMeals = async () => {
  const MAX_RECIPES = 12;
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const responseJson = await response.json();
  return responseJson.meals.slice(0, MAX_RECIPES);
};

export const fetchMealsByCategory = async (category) => {
  const MAX_RECIPES = 12;
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const responseJson = await response.json();
  return responseJson.meals.slice(0, MAX_RECIPES);
};

export const fetchMealById = async (id) => {
  const response = await fetch(`www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const responseJson = await response.json();
  return responseJson.meals[0];
};
