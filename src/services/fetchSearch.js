function fetchSearch({ inputSearch, radioChecked }, type) {
  async function fetchData(URL) {
    try {
      const response = await fetch(URL);
      if (type === 'meals') {
        const { meals } = await response.json();
        return meals;
      }
      const { drinks } = await response.json();
      return drinks;
    } catch (error) {
      throw new Error(error);
    }
  }

  if (type === 'meals') {
    switch (radioChecked) {
    case 'ingredient':
      return fetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`);
    case 'name':
      return fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`);
    case 'first-letter':
      return (inputSearch.length === 1) && fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`);
    default:
      break;
    }
  } else {
    switch (radioChecked) {
    case 'ingredient':
      return fetchData(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputSearch}`);
    case 'name':
      return fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`);
    case 'first-letter':
      return (inputSearch.length === 1) ? fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputSearch}`) : global.alert('Your search must have only 1 (one) character');
    default:
      break;
    }
  }
}

export default fetchSearch;
