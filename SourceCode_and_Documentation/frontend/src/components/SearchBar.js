import React from 'react'

// This is the search bar component. Provide it specified class names for one
// of the two main styles. Either menu, or normal.
export function SearchBar(props) {
  return (
    <div className={props.name}>
      <img
        src="https://img.icons8.com/android/24/000000/search.png"
        className={props.imagename}
        alt="searchIcon"
      ></img>
      <input
        className={props.inputname}
        type="text"
        placeholder={props.placeholder}
        // onChange={evt => console.log(evt.currentTarget.value)}
      ></input>
    </div>
  )
}
