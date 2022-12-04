import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchDetails from '../services/fetchDetails';

function RecipeDetails() {
  const [useDetails, setUseDetails] = useState([]);
  const history = useHistory();
  const { pathname } = history.location;
  let id = '52771';
  let type = 'meals';

  const extrairID = () => {
    const idAux = pathname.substr(pathname.indexOf('=') + 1, pathname.length);
    if (idAux.length !== pathname.length) id = idAux;
    if (pathname.includes('drinks')) {
      type = 'drinks';
    }
    if (pathname.includes('meals')) {
      type = 'meals';
    }
  };

  useEffect(() => {
    const teste = async () => {
      extrairID();
      const a = await fetchDetails(id, type);
      setUseDetails(a);
    };
    teste();
  }, []);

  const valuesApi = (obj, name) => Object.entries(obj)
    .reduce((acc, [key, value]) => (
      value && key.includes(name) ? [...acc, { k: value }] : acc), []);

  let ingredients = {};
  let measure = {};

  if (useDetails[0]) {
    ingredients = valuesApi(useDetails[0], 'strIngredient');
    measure = valuesApi(useDetails[0], 'strMeasure');
  }

  return (
    <div>
      <h1>Recipe Details</h1>
      <div>
        {useDetails.map((m, index) => (
          <div key={ index }>
            <img
              src={ m.strMealThumb || m.strDrinkThumb }
              alt={ m.strMealThumb || m.strDrinkThumb }
              className="search_img"
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-title">{ m.strMeal || m.strDrink }</h2>
            <h5>Category: </h5>
            <p data-testid="recipe-category">{m.strCategory || m.strAlcoholic}</p>
            <h5>Ingredients: </h5>
            <ul>
              {ingredients?.map(({ k }, idx) => (
                <li
                  key={ idx }
                  data-testid={ `${idx}-ingredient-name-and-measure` }
                >
                  {`${k} ${measure[idx].k}`}
                </li>
              ))}
            </ul>
            <h5>Intructions: </h5>
            <p data-testid="instructions">{m.strInstructions}</p>
            <iframe
              title={ m.strMeal }
              src={ m.strYoutube && m.strYoutube.replace(/watch\?v=/g, 'embed/') }
              data-testid="video"
            />
          </div>))}
      </div>
    </div>
  );
}

export default RecipeDetails;
