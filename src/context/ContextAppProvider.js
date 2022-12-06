import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import ContextApp from './ContextApp';

export default function ContextAppProvider({ children }) {
  const [searchedMeals, setSearchedMeals] = useState([]);
  const [detailsInfo, setDetailsInfo] = useState({
    id: '',
    type: '',
  });
  const [searchedDrinks, setSearchedDrinks] = useState([]);
  const [useDetails, setUseDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      isLoading,
      setIsLoading,
      useDetails,
      setUseDetails,
      detailsInfo,
      setDetailsInfo,
    }),
    [
      searchedMeals,
      setSearchedMeals,
      searchedDrinks,
      setSearchedDrinks,
      searchOptions,
      setSearchOptions,
      isLoading,
      setIsLoading,
      useDetails,
      setUseDetails,
      detailsInfo,
      setDetailsInfo,
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
