import React from 'react'

// The following is all the icons for the many genres that there are.
import romanceIcon from '../images/genre-vectors/romance-vector.png'
import dramaIcon from '../images/genre-vectors/drama-vector.png'
import comedyIcon from '../images/genre-vectors/comedy-vector.png'
import horrorIcon from '../images/genre-vectors/horror-vector.png'
import popIcon from '../images/genre-vectors/pop-vector.png'
import rnbIcon from '../images/genre-vectors/rnb-vector.png'
import countryIcon from '../images/genre-vectors/country-vector.png'
import workoutIcon from '../images/genre-vectors/workout-vector.png'

const genreVectors = {
  romance: romanceIcon,
  drama: dramaIcon,
  comedy: comedyIcon,
  horror: horrorIcon,
  pop: popIcon,
  'r&b': rnbIcon,
  country: countryIcon,
  workout: workoutIcon,
}
// This function is a helper for MediaGenreList and creates a genreset given an image source, class name and genre label
export function GenreSet(props) {
  return (
    <div className={props.setClass}>
      <img src={props.imageSource} className={props.class} alt="genre-media" />
      <img
        src={genreVectors[props.genreLabel.toLowerCase()]}
        className="genre-vector"
        alt="genre-icon"
      />
      <div className="genre-label">{props.genreLabel}</div>
    </div>
  )
}
