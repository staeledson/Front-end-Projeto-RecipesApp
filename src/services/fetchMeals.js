function fetchMeals({ inputSearch, radioChecked }) {
  async function fetchData(URL) {
    try {
      const response = await fetch(URL);
      const { meals } = await response.json();
      return meals;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  switch (radioChecked) {
  case 'ingredient':
    return fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`);
  case 'name':
    return fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?s=${inputSearch}`);
  case 'first-letter':
    return (inputSearch.length === 1) ? fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`) : console.log('chamar global alert');
  default:
    break;
  }
}

export default fetchMeals;
