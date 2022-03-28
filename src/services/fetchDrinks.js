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
