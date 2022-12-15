import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ContextApp from '../context/ContextApp';
import fetchSearch from '../services/fetchSearch';

const NOT_FOUND = 'Sorry, we haven\'t found any recipes for these filters.';

function SearchBar() {
  const history = useHistory();
  const { pathname } = history.location;
  const {
    searchOptions,
    setSearchOptions,
    setSearchedDrinks,
    setSearchedMeals,
    setIsLoading,
    setClick,
  } = useContext(ContextApp);

  const handleSearch = ({ target }) => {
    if (target.name === 'search-input') {
      setSearchOptions({ ...searchOptions, inputSearch: target.value });
    } if (target.name === 'search-radio') {
      setSearchOptions({ ...searchOptions, radioChecked: target.value });
    }
  };

  const handleSearchClick = async () => {
    if (searchOptions.inputSearch.length > 1 && searchOptions
      .radioChecked === 'first-letter') {
      global.alert('Your search must have only 1 (one) character');
    } else if (pathname === '/meals') {
      const meals = await fetchSearch(searchOptions, 'meals');
      if (!meals) return global.alert(NOT_FOUND);
      setSearchedMeals(meals);
      setClick(0);
      setIsLoading(false);
    } else {
      const drinks = await fetchSearch(searchOptions, 'drinks');
      if (!drinks) return global.alert(NOT_FOUND);
      setSearchedDrinks(drinks);
      setClick(0);
      setIsLoading(false);
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
        onClick={ handleSearchClick }
      >
        SEARCH
      </button>
    </div>
  );
}

export default SearchBar;
