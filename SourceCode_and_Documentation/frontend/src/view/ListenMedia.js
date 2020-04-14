import React from "react";
import { ListenSet } from "./ListenSet";
import { PodcastSet } from "./PodcastSet";
import { ListenMediaNav } from "./ListenMediaNav";

export function ListenMedia({ category, content, type, num }) {
  if (content !== undefined) {
    const contentStart = content.slice(0, 50);
    if (type === "Podcast" || type === "Playlist") {
      return (
        <div className="category-list">
          <p className="category-title">{category}</p>
          <ListenMediaNav num={num} />
          <div className="listen-category-media">
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
        <ListenMediaNav num={num} />
        <div className="listen-category-media">
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
