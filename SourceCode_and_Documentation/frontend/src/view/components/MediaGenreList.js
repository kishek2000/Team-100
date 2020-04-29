import React from 'react'
import { GenreSet } from './GenreSet'

// This is our genre lists component. On input it will give either the watch or the listen format (listen format still to do).
export function MediaGenreList(props) {
  var classStart = 'watch'
  if (props.media === 'LISTEN') {
    classStart = 'listen'
  }
  const genreLabels = props.genres
  return (
    <div className="category-list">
      <p className="category-title">Genres</p>
      <div className="category-media">
        <GenreSet
          setClass="genre-set"
          imageSource="https://image.tmdb.org/t/p/w600_and_h900_bestv2/5l10EjdgPxu8Gbl5Ww6SWkVQH6T.jpg"
          class={`${classStart}-genre-template-first`}
          genreLabel={genreLabels[0]}
        />
        <GenreSet
          setClass="genre-set-middle"
          imageSource="https://image.tmdb.org/t/p/w600_and_h900_bestv2/nMhv6jG5dtLdW7rgguYWvpbk0YN.jpg"
          class={`${classStart}-genre-template-middle`}
          genreLabel={genreLabels[1]}
        />
        <GenreSet
          setClass="genre-set-middle"
          imageSource="https://image.tmdb.org/t/p/w600_and_h900_bestv2/y55oBgf6bVMI7sFNXwJDrSIxPQt.jpg"
          class={`${classStart}-genre-template-middle`}
          genreLabel={genreLabels[2]}
        />
        <GenreSet
          setClass="genre-set-last"
          imageSource="https://image.tmdb.org/t/p/w600_and_h900_bestv2/nMhv6jG5dtLdW7rgguYWvpbk0YN.jpg"
          class={`${classStart}-genre-template-last`}
          genreLabel={genreLabels[3]}
        />
      </div>
    </div>
  )
}
