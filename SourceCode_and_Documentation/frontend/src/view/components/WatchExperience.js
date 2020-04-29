import React from "react";
import { MediaCategoryList } from "./MediaCategoryList";
import LoadingSpinner from "../../images/tail-spin.svg";
import { WATCH_CATEGORIES } from "../../constants/index";

// This function will give us the complete watch experience!
export function WatchExperience({
  watch,
  searchQuery,
  getOverlayData,
  getOverlayServices,
  getWatchScore,
  getTVEpScores,
  setMovGenresSelected,
  setTVGenresSelected,
  getWatchData,
  getWatchFilteredData,
  movieGenreOptions,
  tvGenreOptions,
  tvGenresSelected,
  movGenresSelected,
}) {
  const { data } = watch;
  const WATCH_LISTS = ["Trending", "Top Rated", "On Air"];
  const WATCH_SUBLISTS = ["TV Shows", "Movies"];
  var counter = -1;
  if (Object.keys(data).length) {
    if (searchQuery.length > 0 && !data["Search Results"]) {
      return (
        <div className="loading-screen">
          <div className="loading-text">LOADING SEARCH RESULTS...</div>
          <img src={LoadingSpinner} alt="load" className="loader" />
        </div>
      );
    } else if (searchQuery.length === 0 && data["Search Results"]) {
      return (
        <div className="loading-screen">
          <div className="loading-text">LOADING WATCH ITEMS...</div>
          <img src={LoadingSpinner} alt="load" className="loader" />
        </div>
      );
    } else if (searchQuery.length > 0 && data[`Search Results`]) {
      const tv_results = data[`Search Results`]["TV Results"];
      const movie_results = data[`Search Results`]["Movie Results"];
      console.table(data[`Search Results`]);
      return (
        <div className="search-results">
          {tv_results.length > 0 || movie_results.length > 0 ? (
            <div>
              <div className="search-results-title">
                Search Results for "{searchQuery}"
              </div>
              <div className="search-watch-lists">
                <MediaCategoryList
                  category="TV Results"
                  media="WATCH"
                  mediaContent={tv_results}
                  getOverlayData={getOverlayData}
                  getOverlayServices={getOverlayServices}
                  getWatchScore={getWatchScore}
                  getTVEpScores={getTVEpScores}
                  num="0"
                />
                <MediaCategoryList
                  category="Movie Results"
                  media="WATCH"
                  mediaContent={movie_results}
                  getOverlayData={getOverlayData}
                  getOverlayServices={getOverlayServices}
                  getWatchScore={getWatchScore}
                  getTVEpScores={getTVEpScores}
                  num="1"
                />
              </div>
            </div>
          ) : (
            <div className="category-title">Sorry! No results were found.</div>
          )}
        </div>
      );
    } else {
      return (
        <div className="watch-experience-lists">
          {WATCH_LISTS.map((category, num) => (
            <div>
              <div className="watch-category-header">
                <div className="category-title-big">{category}</div>
              </div>
              <div>
                {WATCH_SUBLISTS.map((item, index) => (
                  <div key={index}>
                    <MediaCategoryList
                      category={`${category} ${item}`}
                      media="WATCH"
                      mediaContent={data[`${category} ${item}`]}
                      getOverlayData={getOverlayData}
                      getOverlayServices={getOverlayServices}
                      getWatchScore={getWatchScore}
                      getTVEpScores={getTVEpScores}
                      num={() => {
                        counter = counter + 1;
                        return counter;
                      }}
                      setMovGenresSelected={setMovGenresSelected}
                      setTVGenresSelected={setTVGenresSelected}
                      getWatchData={getWatchData}
                      getWatchFilteredData={getWatchFilteredData}
                      movieGenreOptions={movieGenreOptions}
                      tvGenreOptions={tvGenreOptions}
                      tvGenresSelected={tvGenresSelected}
                      movGenresSelected={movGenresSelected}
                      watchCategory={WATCH_CATEGORIES[category]}
                      watchMode={item}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
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
