import React from "react";
export function PodcastSet(props) {
  return (
    <div className="listen-set">
      <img
        src={props.imageSource}
        className={props.mediaClass}
        alt="music_cover"
        onClick={() => {
          props.getOverlayData(props.id, props.type);
        }}
      />
      <p className="listen-media-titles">
        <a
          href={props.listen_link}
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
