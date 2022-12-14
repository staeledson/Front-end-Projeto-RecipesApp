import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class RecommendationCard extends Component {
  render() {
    const { isMeal, index, recommendation } = this.props;
    const handleDragStart = (e) => e.preventDefault();
    return (
      <a
        key={ isMeal ? recommendation?.idDrink : recommendation?.idMeal }
        data-testid={ `${index}-recommendation-card` }
        href={ isMeal ? `/drinks/${recommendation?.idDrink}`
          : `/meals/${recommendation?.idMeal}` }
      >
        <img
          onDragStart={ handleDragStart }
          style={ { maxHeight: '200px' } }
          src={ isMeal
            ? recommendation?.strDrinkThumb : recommendation?.strMealThumb }
          alt={ isMeal ? recommendation?.strDrink : recommendation?.strMeaL }
          role="presentation"
        />
        <span
          data-testid={ `${index}-recommendation-title` }
        >
          { isMeal ? recommendation?.strDrink : recommendation?.strMeal }
        </span>
      </a>
    );
  }
}

RecommendationCard.propTypes = {
  index: PropTypes.number.isRequired,
  isMeal: PropTypes.bool.isRequired,
  recommendation: PropTypes.shape({
    idDrink: PropTypes.string.isRequired,
    idMeal: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strMeaL: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecommendationCard;
