import React from "react";
import LoadingSpinner from "../images/tail-spin.svg";

export function WatchOverlayMeta({ airDate, language, rating, genre }) {
  return [airDate, language, rating, genre]
    .filter((item) => !!item)
    .join(" | ");
}

export function WatchOverlay({
  media_data,
  setOpenOverlayID,
  setOverlayData,
  servicesData,
  setServicesData,
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
