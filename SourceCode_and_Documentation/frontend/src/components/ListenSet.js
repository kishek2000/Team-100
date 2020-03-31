import React from "react";
export function ListenSet(props) {
  return (
    <div className={props.setClass}>
      <a href={props.music_link} target="_blank">
        <img
          src={props.imageSource}
          className={props.mediaClass}
          alt="listen-media"
          href={props.music_link}
        />
      </a>
      <p className="listen-media-titles">
        <a
          href={props.music_link}
          target="_blank"
          className="listen-media-titles"
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
        >
          {props.artist}
        </a>
      </p>
    </div>
  );
}
