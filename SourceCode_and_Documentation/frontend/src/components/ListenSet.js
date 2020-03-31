import React from 'react'
export function ListenSet(props) {
  return (
    <div className={props.setClass}>
      <img
        src={props.imageSource}
        className={props.mediaClass}
        alt="listen-media"
      />
      <p className="listen-media-titles">{props.title}</p>
      <p className="listen-media-subtext">{props.subtext}</p>
    </div>
  )
}
