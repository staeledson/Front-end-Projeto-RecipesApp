async function fetchMeatsDetails() {
  try {
    const URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772';
    const response = await fetch(URL);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.log('entrou no erro');
    throw new Error(error);
  }
}

export default fetchMeatsDetails;
