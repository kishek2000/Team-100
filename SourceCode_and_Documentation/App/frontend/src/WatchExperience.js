import React from 'react'
import { MediaCategoryList } from './MediaCategoryList'
import { MediaGenreList } from './MediaGenreList'
import { WATCH_GENRES } from './constants'

// This function will give us the complete watch experience!
export function WatchExperience() {
  return (
    <div className="watch-experience-lists">
      <MediaCategoryList category="Trending" media="WATCH" />
      <MediaCategoryList category="Top Rated Movies" media="WATCH" />
      <MediaCategoryList category="Top Rated TV Shows" media="WATCH" />
      <MediaCategoryList category="Now Airing TV Shows" media="WATCH" />
      <MediaGenreList media="WATCH" genres={WATCH_GENRES} />
    </div>
  )
}
