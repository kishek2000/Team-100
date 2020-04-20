import React from "react";
import { WatchMediaNav } from "./WatchMediaNav";

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
}) {
  if (content !== undefined) {
    const contentStart = content;
    return (
      <div className="category-list">
        <p className="category-title">{category}</p>
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
                        item["popularity"],
                        item["score"]
                      );
                      getWatchScore(item["id"]);
                      if (item["type"] === "tv") {
                        getTVEpScores(item["id"]);
                      } else {
                        getTVEpScores("t"); //Hacky way of clearing state (will set state to empty array)
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
  } else {
    return <div></div>;
  }
}
