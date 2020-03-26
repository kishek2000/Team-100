import React from 'react';
import './App.css';
// import searchIcon from "./search.png"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="myLounge-heading">
          myLounge
        </p>
        <p className="myLounge-subtitle">
          Listen. Watch. Relax.
        </p>
      </header>
      <body className="App-media-options">
      </body>
      <header className="white-header">
      <p>HI</p> 
      <div className ="search">
        <button type="submit" class="searchButton"></button>
        <input className="searchbar" type="text" placeholder="Search Movies, TV Shows by name..."></input>
      </div>
      </header>
    </div>
  );
}

export default App;
