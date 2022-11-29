import React from 'react';
import Button from './Button';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer" data-testid="footer">
      <Button
        btnClass="drinks"
        id="drinks"
        btnName={
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="taça de drink"
            id="drinks"
          />
        }
      />
      <Button
        btnClass="meals"
        id="meals"
        btnName={
          <img
            data-testid="meals-bottom-btn"
            src={ mealIcon }
            alt="garfo e colher cruzados em um X"
            id="meals"
          />
        }
      />
    </div>
  );
}
