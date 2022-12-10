async function Fetch(url, type) {
  if (type === 'meals') {
    try {
      const response = await fetch(url);
      const { meals } = await response.json();
      return meals;
    } catch (error) {
      throw new Error(error);
    }
  }
  if (type === 'drinks') {
    try {
      const response = await fetch(url);
      const { drinks } = await response.json();
      return drinks;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default Fetch;
