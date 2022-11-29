import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [showBar, setShowBar] = useState(false);
  return (
    <div>
      <h1 data-testid="page-title">App De Receitas</h1>
      <Link to="/profile">
        <image
          data-testid="profile-top-btn"
          src={ profileIcon }
        />
      </Link>
      <button
        type="button"
        onClick={ () => setShowBar(!showBar) }
      >
        <img data-testid="search-top-btn" src={ searchIcon } alt="logoSearch" />
      </button>
    </div>
  );
}

export default Header;
