import React from "react";
import { MediaCategoryList } from "./MediaCategoryList";
import LoadingSpinner from "../images/tail-spin.svg";

// This function will give us the complete watch experience!
export function WatchExperience({ watch, searchQuery, getOverlayData }) {
  const { data } = watch;
  console.table(data);
  if (Object.keys(data).length) {
    if (searchQuery.length > 0 && !data["Search Results"]) {
      return (
        <div className="loading-screen">
          <div className="loading-text">LOADING SEARCH RESULTS...</div>
          <img src={LoadingSpinner} alt="load" className="loader" />
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
              getOverlayData={getOverlayData}
              num="0"
            />
            <MediaCategoryList
              category="Movie Results"
              media="WATCH"
              mediaContent={movie_results}
              getOverlayData={getOverlayData}
              num="1"
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
            getOverlayData={getOverlayData}
            num="0"
          />
          <MediaCategoryList
            category="Top Rated TV Shows"
            media="WATCH"
            mediaContent={data["Top Rated TV Shows"]}
            getOverlayData={getOverlayData}
            num="1"
          />
          <MediaCategoryList
            category="On Air TV Shows"
            media="WATCH"
            mediaContent={data["On Air TV Shows"]}
            getOverlayData={getOverlayData}
            num="2"
          />
          <MediaCategoryList
            category="Popular TV Shows"
            media="WATCH"
            mediaContent={data["Popular TV Shows"]}
            getOverlayData={getOverlayData}
            num="3"
          />
          <MediaCategoryList
            category="Top Rated Movies"
            media="WATCH"
            mediaContent={data["Top Rated Movies"]}
            getOverlayData={getOverlayData}
            num="4"
          />
          <MediaCategoryList
            category="Popular Movies"
            media="WATCH"
            mediaContent={data["Popular Movies"]}
            getOverlayData={getOverlayData}
            num="5"
          />
        </div>
      );
    }
  } else {
    // TODO: add loading state
    return (
      <div className="loading-screen">
        <div className="loading-text">LOADING WATCH ITEMS...</div>
        <img src={LoadingSpinner} alt="load" className="loader" />
      </div>
    );
  }
}
