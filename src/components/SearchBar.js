import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import ContextApp from '../context/ContextApp';
import fetchSearch from '../services/fetchSearch';
import './SearchBar.css';

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
    <div className="search-bar">

      <input
        className="search-input"
        type="text"
        name="search-input"
        data-testid="search-input"
        placeholder="Search"
        onChange={ handleSearch }
      />
      <div className="div-purple">
        <div className="radios">
          <label htmlFor="ingredient-radio">
            <input
              className="input-searchBar"
              type="radio"
              value="ingredient"
              name="search-radio"
              id="ingredient-radio"
              onChange={ handleSearch }
              data-testid="ingredient-search-radio"
            />
            Ingredient
          </label>

          <label htmlFor="name-radio">
            <input
              className="input-searchBar"
              type="radio"
              value="name"
              name="search-radio"
              id="name-radio"
              onChange={ handleSearch }
              data-testid="name-search-radio"
            />
            Name
          </label>

          <label htmlFor="letter-radio">
            <input
              className="input-searchBar"
              type="radio"
              value="first-letter"
              name="search-radio"
              id="letter-radio"
              onChange={ handleSearch }
              data-testid="first-letter-search-radio"
            />
            First letter
          </label>
        </div>

        <button
          className="btn-search"
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleSearchClick }
        >
          SEARCH
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
