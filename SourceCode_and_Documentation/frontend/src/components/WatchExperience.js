import React from "react";
import { MediaCategoryList } from "./MediaCategoryList";
import { MediaGenreList } from "./MediaGenreList";
import { WATCH_GENRES } from "./constants";
import { GetWatchData } from "./DataPaths";

// This function will give us the complete watch experience!
export function WatchExperience() {
  const data = GetWatchData();
  console.table(data);
  return (
    <div className="watch-experience-lists">
      <MediaCategoryList
        category="Trending Daily"
        media="WATCH"
        mediaContent={data[3]["Trending Daily"]}
      />
      <MediaCategoryList
        category="Top Rated TV Shows"
        media="WATCH"
        mediaContent={data[1]["Top Rated TV Shows"]}
      />
      <MediaCategoryList
        category="Now Airing TV Shows"
        media="WATCH"
        mediaContent={data[0]["Now Airing TV Shows"]}
      />
      <MediaCategoryList
        category="Top Rated Movies"
        media="WATCH"
        mediaContent={data[2]["Top Rated Movies"]}
      />
      <MediaGenreList media="WATCH" genres={WATCH_GENRES} />
    </div>
  );
}
