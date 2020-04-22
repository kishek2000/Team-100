import React from "react";

function ListenOverlayMeta({
  releaseDate,
  typeLabel,
  totalTracks,
  giveString,
}) {
  if (totalTracks === 1) {
    typeLabel = "Single";
    totalTracks = null;
  } else if (typeLabel !== "album") {
    typeLabel = typeLabel[0].toUpperCase() + typeLabel.slice(1);
  } else {
    typeLabel = typeLabel[0].toUpperCase() + typeLabel.slice(1);
    totalTracks = `${totalTracks} Tracks`;
  }
  if (giveString) {
    return [releaseDate, typeLabel, totalTracks]
      .filter((item) => !!item)
      .join(" | ");
  }
  return typeLabel;
}

export function ListenOverlay({
  media_data,
  setOpenOverlayID,
  setOverlayData,
  listenYTLink,
  setListenYTLink,
}) {
  return (
    <section className="overlay">
      <div className="overlay-poster-wrapper">
        <img
          src={media_data["imgURL"]}
          className="overlay-poster-music"
          alt="media-poster"
        />
        {media_data["copyright_statement"] !== "" ? (
          <div className="listen-copyrights">
            {media_data["copyright_statement"]}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="overlay-information">
        <div className="overlay-information-header">
          <div className="overlay-title">{media_data["listen_name"]}</div>
          <div
            className="close-text"
            onClick={() => {
              setOpenOverlayID(-1);
              setOverlayData({});
              setListenYTLink({});
            }}
          >
            X
          </div>
        </div>

        <div className="overlay-subtitle">
          {media_data["type"] === "album" || media_data["type"] === "single"
            ? media_data["artist_name"]
            : ""}
        </div>
        <div className="overlay-meta-listen-text">
          <ListenOverlayMeta
            releaseDate={media_data["release_date"]}
            typeLabel={media_data["type"]}
            totalTracks={media_data["total_tracks"]}
            giveString={true}
          />
        </div>
        {media_data["type"] === "podcast" ||
        media_data["type"] === "playlist" ? (
          <div className="overlay-description">
            {" "}
            <div className="overlay-subtitle">Description</div>{" "}
            <div className="overlay-listen-description-text">
              {media_data["description"]}
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div className="overlay-subtitle">Play Now</div>
        <div className="overlay-viewing-row">
          <div
            className="spotify-listen"
            style={
              Object.keys(listenYTLink).length > 0 && listenYTLink !== ""
                ? { width: "50%" }
                : { width: "97%" }
            }
          >
            <div className="overlay-listen-options-text">Spotify:</div>
            <iframe
              src={
                media_data["listen_link"].slice(0, 25) +
                "embed/" +
                media_data["listen_link"].slice(25)
              }
              className="spotify-play"
              title="play"
              frameborder="0"
              allowtransparency="true"
              allow="encrypted-media"
            ></iframe>
          </div>
          {Object.keys(listenYTLink).length > 0 && listenYTLink !== "" ? (
            <div className="listen-video">
              <div className="overlay-listen-options-text">
                Youtube -{" "}
                {String(
                  ListenOverlayMeta({
                    releaseDate: media_data["release_date"],
                    typeLabel: media_data["type"],
                    totalTracks: media_data["total_tracks"],
                    giveString: false,
                  })
                ) === "Single" ||
                String(
                  ListenOverlayMeta({
                    releaseDate: media_data["release_date"],
                    typeLabel: media_data["type"],
                    totalTracks: media_data["total_tracks"],
                    giveString: false,
                  })
                ) === "Track"
                  ? "Full Music Video"
                  : "Full " +
                    String(
                      ListenOverlayMeta({
                        releaseDate: media_data["release_date"],
                        typeLabel: media_data["type"],
                        totalTracks: media_data["total_tracks"],
                        giveString: false,
                      })
                    )}
                :
              </div>
              <iframe
                title="music-video"
                src={listenYTLink}
                allowfullscreen="allowfullscreen"
                className="overlay-music-video"
              ></iframe>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </section>
  );
}
