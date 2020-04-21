import React from "react";
import LoadingSpinner from "../images/tail-spin.svg";

export function WatchOverlayMeta({ airDate, language, rating, genre }) {
  return [airDate, language, rating, genre]
    .filter((item) => !!item)
    .join(" | ");
}

const COLOR_BASE = "241, 219, 75";
const COLOR_EXCELLENT = `rgba(${COLOR_BASE}, 1.0)`;
const COLOR_GREAT = `rgba(${COLOR_BASE}, 0.9)`;
const COLOR_GOOD = `rgba(${COLOR_BASE}, 0.8)`;
const COLOR_OK = `rgba(${COLOR_BASE}, 0.7)`;
const COLOR_BAD = `rgba(${COLOR_BASE}, 0.6)`;
const COLOR_TERRIBLE = `rgba(${COLOR_BASE}, 0.5)`;
const COLOR_NO_DATA = `rgba(${COLOR_BASE}, 0.25)`;

function bgMap(rating) {
  if (rating >= 9) {
    return COLOR_EXCELLENT;
  } else if (rating >= 8) {
    return COLOR_GREAT;
  } else if (rating >= 7) {
    return COLOR_GOOD;
  } else if (rating >= 6) {
    return COLOR_OK;
  } else if (rating >= 5) {
    return COLOR_BAD;
  } else if (rating >= 0) {
    return COLOR_TERRIBLE;
  } else {
    //Negative rating == no data
    return COLOR_NO_DATA;
  }
}

export function WatchOverlay({
  media_data,
  setOpenOverlayID,
  setOverlayData,
  servicesData,
  setServicesData,
  watchReviewData,
  tvReviewData,
  setOverlayReview,
  setOverlayEpisodeReviews,
}) {
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
            className="close-text selected"
            onClick={() => {
              setOverlayData({});
              setOpenOverlayID(-1);
              setServicesData({});
              setOverlayReview("");
              setOverlayEpisodeReviews({});
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
          {typeof watchReviewData === "number" ? (
            " | " +
            (
              <img
                src="https://img.icons8.com/color/48/000000/imdb.png"
                alt="imdb-score:"
                className="overlay-imdb-logo"
              />
            ) +
            watchReviewData
          ) : (
            <div></div>
          )}
        </div>
        <div className="overlay-trailer-and-reviews">
          {media_data["trailer"] !== "" ? (
            <div>
              <div className="overlay-subtitle">Trailer</div>
              <iframe
                title="trailer"
                src={media_data["trailer"]}
                allowFullScreen={true}
                className="overlay-trailer-video"
              ></iframe>
            </div>
          ) : (
            <div></div>
          )}

          {tvReviewData.length > 0 &&
          tvReviewData.filter((term) => {
            if (
              term.filter((season) => {
                return season["rating"] !== -1;
              }).length === 0
            ) {
              return null;
            }
            return true;
          }).length > 0 ? (
            //reviewTable
            <div className="imdb-tv-scores">
              <div className="overlay-subtitle">Reviews</div>
              <div
                className="overlay-table"
                style={
                  media_data["trailer"] !== ""
                    ? { width: "30vw" }
                    : { width: "60vw" }
                }
              >
                {tvReviewData.map((season, index) =>
                  season.length > 1 ? (
                    <div className="overlay-table-data">
                      <div className="overlay-season-description-text">
                        {"Season " + String(index + 1)}
                      </div>
                      <div className="overlay-table-column">
                        {console.log(season, season.length)}
                        {season.map((episode) =>
                          episode.rating >= 0 ? (
                            <div
                              className="overlay-table-cell"
                              style={{
                                backgroundColor: bgMap(episode.rating),
                              }}
                            >
                              <span>
                                <a
                                  href={
                                    "https://www.imdb.com/title/" + episode.ttID
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="overlay-table-cell-ep"
                                >
                                  {"S" + (index + 1) + "E" + episode.ep}
                                </a>
                              </span>
                              <span className="overlay-table-cell-rating">
                                {episode.rating}
                              </span>
                            </div>
                          ) : (
                            <div></div>
                          )
                        )}
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )
                )}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {media_data["overview"] !== "" ? (
          <div className="overlay-description">
            <div className="overlay-subtitle">Description</div>
            <div className="overlay-watch-description-text">
              {media_data["overview"]}
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div className="overlay-services">
          <div className="overlay-subtitle">Streaming Services</div>
          <div className="services-list">
            {servicesData[0] !== undefined ? (
              servicesData[0] !== "empty" ? (
                <div className="services-buttons">
                  {servicesData.map((item, index) => (
                    <div className="service-name" index={index}>
                      <a
                        href={item["link"]}
                        target="_blank"
                        className="service-redirect"
                        rel="noopener noreferrer"
                      >
                        {item["name"]}
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overlay-watch-description-text">
                  Sorry! There are currently no services available.
                </div>
              )
            ) : (
              <div className="overlay-watch-description-text">
                Loading...
                <img
                  src={LoadingSpinner}
                  alt="load"
                  className="overlay-loader"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
