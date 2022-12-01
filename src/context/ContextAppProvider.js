import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import ContextApp from './ContextApp';

export default function ContextAppProvider({ children }) {
  const [searchedMeals, setSearchedMeals] = useState([]);
  const [searchedDrinks, setSearchedDrinks] = useState([]);
  const [searchOptions, setSearchOptions] = useState({
    inputSearch: '',
    radioChecked: 'ingredient',
  });

  const value = useMemo(
    () => ({
      searchedMeals,
      setSearchedMeals,
      searchedDrinks,
      setSearchedDrinks,
      searchOptions,
      setSearchOptions,
    }),
    [
      searchedMeals,
      setSearchedMeals,
      searchedDrinks,
      setSearchedDrinks,
      searchOptions,
      setSearchOptions,
    ],
  );
  return (
    <ContextApp.Provider value={ value }>
      {children}
    </ContextApp.Provider>
  );
}

ContextAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
