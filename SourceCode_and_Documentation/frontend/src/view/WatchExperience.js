import React from "react";
import { MediaCategoryList } from "./MediaCategoryList";
// import { MediaGenreList } from "./MediaGenreList";
// import { WATCH_GENRES } from "../constants";

// This function will give us the complete watch experience!
export function WatchExperience({ watch, searchQuery }) {
  const { data } = watch;
  if (Object.keys(data).length) {
    if (searchQuery.length > 0 && !data["Search Results"]) {
      return (
        <div className="loading-screen">
          <div className="loading-text">LOADING SEARCH DATA</div>
          <div className="loader"></div>
        </div>
      );
    } else if (searchQuery.length > 0 && data[`Search Results`]) {
      const tv_results = data[`Search Results`]["TV Results"];
      const movie_results = data[`Search Results`]["Movie Results"];
      return (
        <div className="search-results">
          <div className="search-results-title">
            Search Results for {searchQuery}
          </div>
          <div className="search-watch-lists">
            <MediaCategoryList
              category="TV Results"
              media="WATCH"
              mediaContent={tv_results}
            />
            <MediaCategoryList
              category="Movie Results"
              media="WATCH"
              mediaContent={movie_results}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="watch-experience-lists">
          <MediaCategoryList
            category="Trending Daily"
            media="WATCH"
            mediaContent={data["Trending Daily"]}
          />
          <MediaCategoryList
            category="Top Rated TV Shows"
            media="WATCH"
            mediaContent={data["Top Rated TV Shows"]}
          />
          <MediaCategoryList
            category="Now Airing TV Shows"
            media="WATCH"
            mediaContent={data["Now Airing TV Shows"]}
          />
          <MediaCategoryList
            category="Top Rated Movies"
            media="WATCH"
            mediaContent={data["Top Rated Movies"]}
          />
          {/* <MediaGenreList media="WATCH" genres={WATCH_GENRES} /> */}
        </div>
      );
    }
  } else {
    // TODO: add loading state
    return (
      <div className="loading-screen">
        <div className="loading-text">LOADING WATCH DATA</div>
        <div className="loader"></div>
      </div>
    );
  }
}
