import React from 'react';
import './App.css';

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////// TMP GLOBALS /////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Temporary global variable for currently selected item, initialised as WATCH:
var currentMediaSelected = "WATCH";

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// MAIN APP ////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
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
        <SearchBar name="searchbar-menu" inputname="searchinput-menu" imagename="searchbutton-menu" placeholder="Search for Movie, TV Show, Podcast or Music by name..."/>
      </header>
      <body className="App-media-options">
        <div className="filters-header">
          <div className="media-selection">
            <p className="selection-label">I want to</p>
            <MediaSelector currentValue={currentMediaSelected}/>
          </div>
          <SearchBar name="searchbar" inputname="searchinput" imagename="searchbutton" placeholder="Search for Movie or TV Show by name..."/>
        </div>
      </body>
    </div>
  );
}

export default App;

//////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// COMPONENTS ///////////////////////////////
//////////////////////////////////////////////////////////////////////////////

// This is the search bar component. Provide it specified class names for one
// of the two main styles. Either menu, or normal.
function SearchBar (props) {
  return (
      <div className = {props.name}>
          <img src="https://img.icons8.com/android/24/000000/search.png" className={props.imagename} alt="searchIcon"></img>
          <input className={props.inputname} type="text" placeholder={props.placeholder}></input>
      </div>
  );
}

// This now is our media selection component. This only varies in its list, which you can provide.
function MediaSelector (props) {
    return (
      <div className="selection-dropdown">
        <div className="main-selection">
          <input className="media-dropdown" type="button" value={props.currentValue}></input>
          <img src="https://img.icons8.com/material-sharp/24/000000/give-way--v1.png" className="dropdown-button" alt="main-selector"/>
        </div>
      </div>
    )
  }
