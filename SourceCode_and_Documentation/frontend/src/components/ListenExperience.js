import React from 'react'
import { MediaCategoryList } from './MediaCategoryList'
import { MediaGenreList } from './MediaGenreList'
import { LISTEN_GENRES } from './constants'

// This function will give us the complete Listen experience!
export function ListenExperience() {
  return (
    <div className="listen-experience-lists">
      <MediaCategoryList
        category="Popular Songs"
        media="LISTEN"
        mediaType="Song"
      />
      <MediaCategoryList
        category="Top Rated Albums"
        media="LISTEN"
        mediaType="Album"
      />
      <MediaCategoryList
        category="Top Rated Podcasts"
        media="LISTEN"
        mediaType="Podcast"
      />
      <MediaGenreList media="LISTEN" genres={LISTEN_GENRES} />
    </div>
  )
}
