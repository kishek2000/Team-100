import React from "react";
export function ListenSet(props) {
  return (
    <div className="listen-set">
      <div className="listen-set-image">
        <a href={props.music_link} target="_blank" rel="noopener noreferrer">
          <img
            src={props.imageSource}
            className={props.mediaClass}
            alt="music_cover"
            href={props.music_link}
          />
        </a>
      </div>
      <p className="listen-media-titles">
        <a
          href={props.music_link}
          target="_blank"
          className="listen-media-titles"
          rel="noopener noreferrer"
        >
          {props.title}
        </a>
      </p>
      <p className="listen-media-subtext">
        {props.subtext} by{" "}
        <a
          href={props.artist_link}
          className="listen-artist-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {props.artist}
        </a>
      </p>
    </div>
  );
}
