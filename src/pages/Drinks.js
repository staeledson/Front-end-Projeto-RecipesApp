import React, { useContext } from 'react';
import SearchBar from '../components/SearchBar';
import ContextApp from '../context/ContextApp';

function Drinks() {
  const { searchedDrinks } = useContext(ContextApp);
  console.log(searchedDrinks);
  return (
    <div>
      <h1>Drinks Page</h1>
      <SearchBar />
      <div>
        {
          searchedDrinks?.map((d) => (
            <div key={ d.idIngredient }>
              <p>{d.idIngredient}</p>
              <p>{d.strIngredient}</p>
              <p>{d.strDescription}</p>
              <p>{d.strType}</p>
              <p>{d.strAlcohol}</p>
              <p>{d.strABV}</p>
            </div>))
        }
      </div>
    </div>
  );
}

export default Drinks;
