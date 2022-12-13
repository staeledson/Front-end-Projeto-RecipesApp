import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import ContextAppProvider from './context/ContextAppProvider';

function App() {
  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
