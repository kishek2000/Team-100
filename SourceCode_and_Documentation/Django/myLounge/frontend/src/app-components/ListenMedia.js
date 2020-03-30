import React from 'react'
import { ListenSet } from './ListenSet'
export function ListenMedia({ category, mediaType }) {
  const titleText = `${mediaType} Name`
  return (
    <div className="category-list">
      <p className="category-title">{category}</p>
      <div className="category-media">
        <ListenSet
          setClass="listen-set-first"
          imageSource="https://image.tmdb.org/t/p/w600_and_h900_bestv2/5l10EjdgPxu8Gbl5Ww6SWkVQH6T.jpg"
          title={titleText}
          subtext={`${mediaType} subtext here`}
          mediaClass="listen-media-first"
        />

        <ListenSet
          setClass="listen-set-middle"
          imageSource="https://image.tmdb.org/t/p/w600_and_h900_bestv2/nMhv6jG5dtLdW7rgguYWvpbk0YN.jpg"
          title={titleText}
          subtext={`${mediaType} subtext here`}
          mediaClass="listen-media-middle"
        />

        <ListenSet
          setClass="listen-set-middle"
          imageSource="https://image.tmdb.org/t/p/w600_and_h900_bestv2/y55oBgf6bVMI7sFNXwJDrSIxPQt.jpg"
          title={titleText}
          subtext={`${mediaType} subtext here`}
          mediaClass="listen-media-middle"
        />

        <ListenSet
          setClass="listen-set-last"
          imageSource="https://image.tmdb.org/t/p/w600_and_h900_bestv2/nMhv6jG5dtLdW7rgguYWvpbk0YN.jpg"
          title={titleText}
          subtext={`${mediaType} subtext here`}
          mediaClass="listen-media-last"
          alt="listen-media"
        />
      </div>
    </div>
  )
}
