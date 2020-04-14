import React from "react";
export function Overlay({
  experience,
  data,
  setOpenOverlayID,
  media_id,
  setOverlayData,
}) {
  // const id, media = media_id.split()
  if (Object.keys(data).length > 0 && media_id !== -1) {
    const record = data["data"];
    if (Object.keys(record).length > 0 && media_id !== -1) {
      const media_data = record[0];
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
              <div className="overlay-year">
                ({media_data["first_air_date"]})
              </div>
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
            <div className="overlay-genres">{media_data["genres"]}</div>
            <div className="overlay-description">
              <div className="overlay-description-title">Description</div>
              <div className="overlay-description-text">
                {media_data["overview"]}
              </div>
            </div>
            <div className="overlay-links"></div>
            <div className="overlay-description-title">Trailer</div>
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
  }
  return <div></div>;
}
