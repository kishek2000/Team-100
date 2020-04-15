import React from "react";

export function WatchOverlayMeta({ airDate, language, rating, genre }) {
  return [airDate, language, rating, genre]
    .filter((item) => !!item)
    .join(" | ");
}

export function WatchOverlay({ media_data, setOpenOverlayID, setOverlayData }) {
  return (
    <section className="overlay">
      <div className="overlay-poster-wrapper">
        <img
          src={media_data["imgURL"]}
          className="overlay-poster"
          alt="media-poster"
        />
      </div>
      <div className="overlay-information">
        <div className="overlay-information-header">
          <div className="overlay-title">{media_data["name"]}</div>
          <div
            className="close-text"
            onClick={() => {
              setOpenOverlayID(-1);
              setOverlayData({});
            }}
          >
            X
          </div>
        </div>
        <div className="overlay-meta-watch-text">
          <WatchOverlayMeta
            airDate={media_data["first_air_date"]}
            language={media_data["lang"]}
            rating={media_data["content_rating"]}
            genre={media_data["genres"]}
          />
        </div>
        <div className="overlay-description">
          <div className="overlay-subtitle">Description</div>
          <div className="overlay-watch-description-text">
            {media_data["overview"]}
          </div>
        </div>
        <div className="overlay-links"></div>
        <div className="overlay-subtitle">Trailer</div>
        <iframe
          title="trailer"
          src={media_data["trailer"]}
          allowfullscreen="allowfullscreen"
          className="overlay-trailer-video"
        ></iframe>
      </div>
    </section>
  );
}
