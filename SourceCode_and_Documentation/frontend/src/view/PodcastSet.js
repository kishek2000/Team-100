import React from "react";
export function PodcastSet(props) {
  return (
    <div className="listen-set">
      <a href={props.show_link} target="_blank" rel="noopener noreferrer">
        <img
          src={props.imageSource}
          className={props.mediaClass}
          alt="music_cover"
          href={props.show_link}
        />
      </a>
      <p className="listen-media-titles">
        <a
          href={props.show_link}
          target="_blank"
          className="listen-media-titles"
          rel="noopener noreferrer"
        >
          {props.title}
        </a>
      </p>
      <p className="listen-media-subtext">{props.subtext}</p>
    </div>
  );
}
