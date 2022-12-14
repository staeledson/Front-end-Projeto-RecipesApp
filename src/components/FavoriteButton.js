import React from 'react';
import witheHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteButton() {
  return (
    <div>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        <img src={ witheHeartIcon } alt="icon-favorite" />
      </button>
    </div>
  );
}

export default FavoriteButton;
