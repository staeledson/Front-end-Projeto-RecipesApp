function fetchDrinks({ inputSearch, radioChecked }) {
  async function fetchData(URL) {
    console.log(URL);
    try {
      const response = await fetch(URL);
      const { ingredients } = await response.json();
      console.log(ingredients);
      return ingredients;
    } catch (error) {
      throw new Error(error);
    }
  }

  switch (radioChecked) {
  case 'ingredient':
    return fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${inputSearch}`);
  case 'name':
    return fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`);
  case 'first-letter':
    return (inputSearch.length === 1) ? fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputSearch}`) : global.alert('Your search must have only 1 (one) character');
  default:
    break;
  }
}

export default fetchDrinks;
