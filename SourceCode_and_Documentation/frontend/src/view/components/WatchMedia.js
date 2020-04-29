import React from "react";
import { WatchMediaNav } from "./WatchMediaNav";
import { FilterWatchBar } from "./FilterWatchBar";

function WatchMediaMetadata({ airDate, language, genre }) {
  return [airDate, language, genre].filter((item) => !!item).join(" | ");
}

export function WatchMedia({
  category,
  content,
  getOverlayData,
  num,
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
  watchCategory,
  watchMode,
}) {
  if (content !== undefined && content.length > 0) {
    const contentStart = content;
    return (
      <div className="category-list">
        <div className="category-header">
          <p className="category-title">{category}</p>
          <FilterWatchBar
            setMovGenresSelected={setMovGenresSelected}
            setTVGenresSelected={setTVGenresSelected}
            getWatchData={getWatchData}
            getWatchFilteredData={getWatchFilteredData}
            movieGenreOptions={movieGenreOptions}
            tvGenreOptions={tvGenreOptions}
            tvGenresSelected={tvGenresSelected}
            movGenresSelected={movGenresSelected}
            watchCategory={watchCategory}
            watchMode={watchMode}
          />
        </div>
        <WatchMediaNav num={num} />
        <div className="category-media">
          {contentStart.map((item, index) =>
            item["id"] !== null ? (
              <div className="media-template" key={index}>
                <div className="media-image-wrapper">
                  <div className="media-user-score">
                    <span className="user-score-text">
                      {Math.round(item["score"] * 1000) / 10}%
                    </span>
                  </div>
                  <img
                    index={index}
                    src={item["imgURL"]}
                    className="media-image"
                    alt="media"
                    onClick={() => {
                      getOverlayData(item["id"], item["type"]);
                      getOverlayServices(
                        item["id"],
                        item["name"],
                        item["first_air_date"],
                        item["type"]
                      );
                      getWatchScore(item["id"], item["type"]);
                      if (item["type"] === "tv") {
                        getTVEpScores(item["id"]);
                      }
                    }}
                  />
                </div>
                <p className="watch-title">{item["name"]}</p>
                <div className="watch-metadata">
                  <WatchMediaMetadata
                    airDate={item["first_air_date"]}
                    language={item["lang"]}
                    genre={item["genre"]}
                  />
                </div>
              </div>
            ) : (
              <div></div>
            )
          )}
        </div>
      </div>
    );
  } else if (content.length === 0) {
    return (
      <div className="no-results-title">
        Sorry! There were no {category} were found.
      </div>
    );
  } else {
    return <div></div>;
  }
}
