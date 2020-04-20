import React from "react";
import LoadingSpinner from "../images/tail-spin.svg";

export function WatchOverlayMeta({ airDate, language, rating, genre }) {
  return [airDate, language, rating, genre]
    .filter((item) => !!item)
    .join(" | ");
}

const COLOR_EXCELLENT = "#60B80E"
const COLOR_GREAT = "#83CE09"
const COLOR_GOOD = "#E4CD2C"
const COLOR_OK = "#F3A533"
const COLOR_BAD = "#E93F33"
const COLOR_TERRIBLE = "#8D3FBB"
const COLOR_NO_DATA = ""

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
}) {
  console.log(watchReviewData);
  console.log(tvReviewData);
  console.log(media_data);
  if (tvReviewData.length > 0) {
    const reviewTable = tvReviewData.map((season, index) => 
      <li>Season {index}: {season.length} episodes</li>
    );
    console.log(reviewTable);
  }
  

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
          
            {tvReviewData.length > 0 ? (
              //reviewTable
              <div className="imdb-tv-scores">
                <div className="overflow-subtitle"> 
                Reviews across seasons
                </div>
                <div className="overlay-table">
                  {tvReviewData.map((season, index) => (
                    <div className="overlay-table-column">{index + 1}
                      {season.map((episode) => (
                        <div className="overlay-table-cell" 
                          style={{
                            backgroundColor: bgMap(episode.rating)
                          }}
                        >
                          {episode.rating >= 0 ? episode.rating : "-"}
                        </div>
                        )
                      )}
                    </div>
                    )
                  )}
                </div>
              </div>
            ) : (
              <div></div>
            )}
        </div>
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
        <div className="imdb-score">
          {typeof watchReviewData === "number" ? (
            watchReviewData
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </section>
  );
}
