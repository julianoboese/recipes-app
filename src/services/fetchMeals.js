export const fetchMealCategories = async () => {
  const response = await fetch('www.themealdb.com/api/json/v1/1/categories.php');
  const responseJson = await response.json();
  return responseJson.categories;
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
