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
            <MediaSelector currentValue="LISTEN" />
          </div>
          <SearchBar name="searchbar" inputname="searchinput" imagename="searchbutton" placeholder="Search for Movie or TV Show by name..."/>
        </div>

        <MediaCategoryList category="Trending"/>
        <MediaCategoryList category="Top Rated Movies"/>
        <MediaCategoryList category="Top Rated TV Shows"/>
        <MediaCategoryList category="Now Airing TV Shows"/>
        <MediaGenreList media="TV" genreOne="Romance" genreTwo="Drama" genreThree="Comedy" genreFour="Horror"/>
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
      <input className="media-button" type="button" value={props.currentValue}></input>
    )
  }

// This is our category lists component. For now we just vary this with the labelling.
function MediaCategoryList (props) {
  return (
    <div className="category-list">
      <p className="category-title">{props.category}</p>
      <div className="category-media" >
        {/* <img src="https://img.icons8.com/ios/64/000000/circled-chevron-right.png" className="prev-button" alt="prev"/> */}
        <img src='https://image.tmdb.org/t/p/w600_and_h900_bestv2/5l10EjdgPxu8Gbl5Ww6SWkVQH6T.jpg' className="media-template-first" alt="media"/>
        <img src='https://image.tmdb.org/t/p/w600_and_h900_bestv2/nMhv6jG5dtLdW7rgguYWvpbk0YN.jpg' className="media-template-middle" alt="media"/>
        <img src='https://image.tmdb.org/t/p/w600_and_h900_bestv2/y55oBgf6bVMI7sFNXwJDrSIxPQt.jpg' className="media-template-middle" alt="media"/>
        <img src='https://image.tmdb.org/t/p/w600_and_h900_bestv2/nMhv6jG5dtLdW7rgguYWvpbk0YN.jpg' className="media-template-last" alt="media"/>
        {/* <img src="https://img.icons8.com/ios/64/000000/circled-chevron-right.png" className="next-button" alt="next"/> */}
      </div>
    </div>
  )
}

// This is our genre lists component. On input it will give either the watch or the listen format (listen format still to do).
function MediaGenreList (props) {
  if (props.media === "TV") {
    return (
      <div className="category-list">
        <p className="category-title">Genre</p>
        <div className="category-media" >
          {/* <img src="https://img.icons8.com/ios/64/000000/circled-chevron-right.png" className="prev-button" alt="prev"/> */}
          <GenreSet setClass='genre-set' imageSource='https://image.tmdb.org/t/p/w600_and_h900_bestv2/5l10EjdgPxu8Gbl5Ww6SWkVQH6T.jpg' class="media-genre-template-first" genreLabel="Romance"/>
          <GenreSet setClass='genre-set-middle' imageSource='https://image.tmdb.org/t/p/w600_and_h900_bestv2/nMhv6jG5dtLdW7rgguYWvpbk0YN.jpg' class="media-genre-template-middle" genreLabel="Drama"/>
          <GenreSet setClass='genre-set-middle' imageSource='https://image.tmdb.org/t/p/w600_and_h900_bestv2/y55oBgf6bVMI7sFNXwJDrSIxPQt.jpg' class="media-genre-template-middle" genreLabel="Comedy"/>
          <GenreSet setClass='genre-set-last' imageSource='https://image.tmdb.org/t/p/w600_and_h900_bestv2/nMhv6jG5dtLdW7rgguYWvpbk0YN.jpg' class="media-genre-template-last" genreLabel="Horror"/>

          {/* <img src="https://img.icons8.com/ios/64/000000/circled-chevron-right.png" className="next-button" alt="next"/> */}
        </div>
      </div>
    )
  }
}

// This function is a helper for MediaGenreList and creates a genreset given an image source, class name and genre label
function GenreSet (props) {
  return (
    <div className={props.setClass}>
      <img src={props.imageSource} className={props.class} alt="media"/>
      <div className="genre-label">{props.genreLabel}</div>
    </div>
  )
}