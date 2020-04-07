import React from "react";
import { ListenSet } from "./ListenSet";

export function ListenMedia({ category, content, type }) {
  console.log("hello");
  console.table(content);
  if (content !== undefined) {
    const contentStart = content;
    if (type === "Podcast") {
      return (
        <div className="category-list">
          <p className="category-title">{category}</p>
          <div className="category-media">
            {contentStart.map((item, index) => (
              <PodcastSet
                index={index}
                imageSource={item["imgURL"]}
                title={item["show_name"]}
                subtext={item["description"]}
                show_link={item["show_link"]}
                mediaClass="listen-media"
              />
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="category-list">
        <p className="category-title">{category}</p>
        <div className="category-media">
          {contentStart.map((item, index) => (
            <ListenSet
              index={index}
              imageSource={item["imgURL"]}
              title={item["music_name"]}
              subtext={item["type"]}
              artist={item["artist_name"]}
              artist_link={item["artist_link"]}
              music_link={item["music_link"]}
              mediaClass="listen-media"
            />
          ))}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

function PodcastSet(props) {
  return (
    <div className="listen-set">
      <a href={props.music_link} target="_blank" rel="noopener noreferrer">
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
