export const fetchDrinkCategories = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const responseJson = await response.json();
  return responseJson.categories;
};

export const fetchDrinkById = async (id) => {
  const response = await fetch(`www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const responseJson = await response.json();
  return responseJson.meals[0];
};

export const fetchDrinkByIngredients = async (ingredient) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(URL);
  const responseJson = await response.json();
  return responseJson.drinks;
};

export const fetchDrinkByName = async (name) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(URL);
  const responseJson = await response.json();
  return responseJson.drinks;
};

export const fetchDrinkByFirstLetter = async (firstLetter) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(URL);
  const responseJson = await response.json();
  return responseJson.drinks;
};
