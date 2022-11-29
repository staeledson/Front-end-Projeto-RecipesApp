import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer" data-testid="footer">
      <Link to="/drinks" className="link-drinks">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="taça de drink"
          id="drinks"
        />
      </Link>
      <Link to="/meals" className="link-meals">
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="garfo e colher cruzados em um X"
          id="meals"
        />
      </Link>
    </div>
  );
}

Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
