import React from 'react';

function searchBar (props) {
    return (
        <div className ="searchbar">
            <img src="https://img.icons8.com/android/24/000000/search.png" className="searchButton" alt="searchIcon"></img>
            <input className="searchinput" type="text" placeholder="Search Movies, TV Shows by name..."></input>
        </div>
    );
}