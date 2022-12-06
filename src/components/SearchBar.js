import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ContextApp from '../context/ContextApp';
import fetchMeals from '../services/fetchMeals';
import fetchDrinks from '../services/fetchDrinks';

function SearchBar() {
  // const { searchedMeals, searchedDrinks } = useContext(ContextApp);
  // const alert = 'Sorry, we haven`t found any recipes for these filters.';
  const history = useHistory();
  const { pathname } = history.location;
  const {
    searchOptions,
    setSearchOptions,
    setSearchedDrinks,
    setSearchedMeals,
  } = useContext(ContextApp);

  const handleSearch = ({ target }) => {
    switch (target.name) {
    case 'search-input':
      setSearchOptions({ ...searchOptions, inputSearch: target.value });
      break;
    case 'search-radio':
      setSearchOptions({ ...searchOptions, radioChecked: target.value });
      break;

    default:
      break;
    }
  };

  const handleSearchClick = async () => {
    if (searchOptions.inputSearch.length > 1 && searchOptions
      .radioChecked === 'first-letter') {
      global.alert('Your search must have only 1 (one) character');
      console.log('if');
    } else if (pathname === '/meals') {
      const meals = await fetchMeals(searchOptions);
      setSearchedMeals(meals);
      console.log('else if');
    } else {
      const drinks = await fetchDrinks(searchOptions);
      setSearchedDrinks(drinks);
      console.log('else');
    }
  };

  return (
    <div>
      <input
        type="text"
        name="search-input"
        data-testid="search-input"
        onChange={ handleSearch }

      />
      <p />
      <input
        type="radio"
        value="ingredient"
        name="search-radio"
        onChange={ handleSearch }
        data-testid="ingredient-search-radio"
      />
      {' '}
      Ingredient
      <input
        type="radio"
        value="name"
        name="search-radio"
        onChange={ handleSearch }
        data-testid="name-search-radio"
      />
      {' '}
      Name
      <input
        type="radio"
        value="first-letter"
        name="search-radio"
        onChange={ handleSearch }
        data-testid="first-letter-search-radio"
      />
      {' '}
      First letter
      <p />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ async () => handleSearchClick() }
      >
        SEARCH
      </button>
    </div>
  );
}

export default SearchBar;
