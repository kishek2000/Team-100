/*
  This file is a special set of listen media - it provides the component for each single podcast or playlist item in a list.
*/

import React from "react";
export function PodcastSet(props) {
  return (
    <div className="listen-set">
      <div className="listen-image">
        <img
          src={props.imageSource}
          className={props.mediaClass}
          alt="music_cover"
          onClick={() => {
            props.getOverlayData(props.id, props.type);
          }}
        />
      </div>
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
