import React from "react";
import LoadingSpinner from "../../images/tail-spin.svg";

export function WatchOverlayMeta({ airDate, language, rating, genre }) {
  return [airDate, language, rating, genre, " "]
    .filter((item) => !!item)
    .join(" | ");
}

const COLOR_EXCELLENT = `rgba(0, 26, 255, 1.0)`;
const COLOR_GREAT = `rgba(0, 96, 255, 1.0)`;
const COLOR_GOOD = `rgba(0, 158, 255, 1.0)`;
const COLOR_OK = `rgba(255, 138, 217, 1.0)`;
const COLOR_BAD = `rgba(255, 148, 115, 1.0)`;
const COLOR_TERRIBLE = `rgba(212, 0, 0, 1.0)`;
const COLOR_NO_DATA = `rgba(0,0,0,0)`;

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
            <div className="imdb-score">
              <img
                src="https://img.icons8.com/color/48/000000/imdb.png"
                alt="imdb-score:"
                className="overlay-imdb-logo"
              />{" "}
              {watchReviewData}
            </div>
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
                  season.length > 1 &&
                  season.filter((term) => {
                    return term["rating"] !== -1;
                  }).length > 0 ? (
                    <div className="overlay-table-data">
                      <div className="overlay-season-description-text">
                        {"Season " + String(index + 1)}
                      </div>
                      <div className="overlay-table-column">
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
                        className="watch-service-redirect"
                        rel="noopener noreferrer"
                      >
                        <div className="wrap">
                          <img
                            src={"http://" + item["logo"]}
                            alt="logo"
                            className="overlay-watch-service-logo"
                          />
                        </div>
                        <div className="overlay-services-metadata">
                          <div>{item["name"]}</div>
                          {/* <div className="overlay-service-price">
                            {item["price"]}
                            {console.log(item)}
                          </div> */}
                        </div>
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
