import React, { useEffect, useState } from 'react';
import fetchMeatsDetails from '../services/fetchMeatsDetails';

function RecipeDetails() {
  const [useDetails, setUseDetails] = useState([]);
  // const history = useHistory();
  // const { pathname } = history.location;

  useEffect(() => {
    const teste = async () => {
      const a = await fetchMeatsDetails();
      setUseDetails(a);
    };
    teste();
  }, []);

  return (
    <div>
      <h1>RecipeDetails</h1>
      <div>
        {useDetails.map((m, index) => (
          <div key={ index }>
            <img
              src={ m.strMealThumb }
              className="search_img"
              alt={ m.strMealThumb }
              data-testid="recipe-photo"
            />
            <p data-testid="recipe-title">{m.strMeal}</p>
            <p data-testid="recipe-category">{m.strCategory}</p>
            {/* <p data-testid="${index}-ingredient-name-and-measure">{m.strIngredient1}</p> */}
            <p data-testid="instructions">{m.strInstructions}</p>
            <p data-testid="video">{m.strYoutube}</p>
            {/* <iframe
              width="1440"
              height="762"
              title={ m.strMeal }
              src={ m.strYoutube }
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen */}
            {/* /> */}
          </div>))}
      </div>
    </div>
  );
}

export default RecipeDetails;
