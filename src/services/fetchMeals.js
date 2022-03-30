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

export const fetchMealByIngredients = async (ingredient) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(URL);
  const responseJson = await response.json();
  return responseJson.meals;
};

export const fetchMealByCountry = async (country) => {
  const MAX_RECIPES = 12;
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`;
  const response = await fetch(URL);
  const responseJson = await response.json();
  return responseJson.meals.slice(0, MAX_RECIPES);
};

export const fetchMealByName = async (name) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(URL);
  const responseJson = await response.json();
  return responseJson.meals;
};

export const fetchMealByFirstLetter = async (firstLetter) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(URL);
  const responseJson = await response.json();
  return responseJson.meals;
};

export const fetchMealRandomly = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const response = await fetch(URL);
  const responseJson = await response.json();
  return responseJson.meals;
};

export const fetchMealIngredients = async () => {
  const MAX_RECIPES = 12;
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(URL);
  const responseJson = await response.json();
  return responseJson.meals.slice(0, MAX_RECIPES);
};

export const fetchMealCountries = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const response = await fetch(URL);
  const responseJson = await response.json();
  return responseJson.meals;
};
