async function fetchCategory(type) {
  if (type === 'meals') {
    try {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(URL);
      const { meals } = await response.json();
      return meals;
    } catch (error) {
      throw new Error(error);
    }
  }
  if (type === 'drinks') {
    try {
      const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(URL);
      const { drinks } = await response.json();
      return drinks;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default fetchCategory;
