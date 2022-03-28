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
