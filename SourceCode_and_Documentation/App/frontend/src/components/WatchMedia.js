import React from 'react'
export function WatchMedia({ category }) {
  return (
    <div className="category-list">
      <p className="category-title">{category}</p>
      <div className="category-media">
        <img
          src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/5l10EjdgPxu8Gbl5Ww6SWkVQH6T.jpg"
          className="media-template-first"
          alt="media"
        />
        <img
          src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/nMhv6jG5dtLdW7rgguYWvpbk0YN.jpg"
          className="media-template-middle"
          alt="media"
        />
        <img
          src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/y55oBgf6bVMI7sFNXwJDrSIxPQt.jpg"
          className="media-template-middle"
          alt="media"
        />
        <img
          src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/nMhv6jG5dtLdW7rgguYWvpbk0YN.jpg"
          className="media-template-last"
          alt="media"
        />
      </div>
    </div>
  )
}
