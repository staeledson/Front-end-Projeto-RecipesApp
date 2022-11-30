function fetchMeals({ inputSearch, radioChecked }) {
  async function fetchData(URL) {
    try {
      const response = await fetch(URL);
      console.log(response);
      const { meals } = await response.json();
      return meals;
    } catch (error) {
      throw new Error(error);
    }
  }

  switch (radioChecked) {
  case 'ingredient':
    return fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`);
  case 'name':
    console.log(radioChecked);
    return fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`);
  case 'first-letter':
    return (inputSearch.length === 1) ? fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`) : global.alert('Your search must have only 1 (one) character');
  default:
    break;
  }
}

export default fetchMeals;
