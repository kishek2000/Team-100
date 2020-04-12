import React from "react";
export function Overlay({
  media_id,
  media_category,
  experience,
  watchData,
  listenData,
  setOpenOverlayID,
}) {
  if (
    experience === "WATCH" &&
    media_id !== -1 &&
    Object.keys(watchData).length > 0
  ) {
    console.log("the id is: ", media_id);
    var { data } = watchData;
    var media_data;
    var records;
    if (media_category["category"].includes("Results")) {
      records = data["Search Results"][media_category["category"]];
      media_data = records.find((key) => key.id === media_id);
    } else {
      records = data[media_category["category"]];
      media_data = records.find((key) => key.id === media_id);
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
            <div className="overlay-year">({media_data["first_air_date"]})</div>
            <div
              className="close-text"
              onClick={() => {
                setOpenOverlayID(-1);
              }}
            >
              X
            </div>
            {/* <button
              className="close-button"
              onClick={() => {
                setOpenOverlayID(-1);
              }}
            >
              <div className="close-button-text">X</div>
            </button> */}
          </div>
          <div className="overlay-genres">{media_data["genres"]}</div>
          <div className="overlay-description">
            <div className="overlay-description-title">Description</div>
            <div className="overlay-description-text">
              {media_data["overview"]}
            </div>
          </div>
          <div className="overlay-links"></div>
        </div>
      </section>
    );
  }
  return <div></div>;
}
