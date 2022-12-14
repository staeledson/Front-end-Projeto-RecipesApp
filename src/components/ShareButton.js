import React from 'react';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="botão de compartilhar" />
      </button>
    </div>
  );
}

export default ShareButton;
