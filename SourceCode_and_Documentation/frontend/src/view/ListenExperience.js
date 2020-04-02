import React from "react";
import { MediaCategoryList } from "./MediaCategoryList";
// import { MediaGenreList } from "./MediaGenreList";
// import { LISTEN_GENRES } from "../constants";

// This function will give us the complete Listen experience!
export function ListenExperience({ listen }) {
  const { data } = listen;
  console.table(data);
  if (data !== undefined) {
    return (
      <div className="listen-experience-lists">
        <MediaCategoryList
          category="New Releases"
          media="LISTEN"
          mediaContent={data["New Releases"]}
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
        {/* <MediaGenreList media="LISTEN" genres={LISTEN_GENRES} /> */}
      </div>
    );
  }
  // TODO: add loading state
  return null;
}
