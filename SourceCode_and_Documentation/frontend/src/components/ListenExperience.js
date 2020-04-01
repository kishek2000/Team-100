import React from "react";
import { MediaCategoryList } from "./MediaCategoryList";
import { MediaGenreList } from "./MediaGenreList";
import { LISTEN_GENRES } from "./constants";
import { GetListenData } from "./DataPaths";

// This function will give us the complete Listen experience!
export function ListenExperience() {
  const data = GetListenData(true);
  return (
    <div className="listen-experience-lists">
      <MediaCategoryList
        category="New Releases"
        media="LISTEN"
        mediaContent={data[0]["New Releases"]}
      />
      <MediaCategoryList
        category="Top Rated Albums"
        media="LISTEN"
        // mediaContent={data}
      />
      <MediaCategoryList
        category="Top Rated Podcasts"
        media="LISTEN"
        // mediaContent={data}
      />
      <MediaGenreList media="LISTEN" genres={LISTEN_GENRES} />
    </div>
  );
}
