import React from "react";
import { ListenSet } from "./ListenSet";
import { PodcastSet } from "./PodcastSet";
import { ListenMediaNav } from "./ListenMediaNav";

export function ListenMedia({ category, content, type, num, getOverlayData }) {
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
                title={item["listen_name"]}
                subtext={item["description"]}
                listen_link={item["listen_link"]}
                mediaClass="listen-media"
                getOverlayData={getOverlayData}
                id={item["id"]}
                type={type.toLowerCase()}
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
              title={item["listen_name"]}
              subtext={item["type"]}
              artist={item["artist_name"]}
              artist_link={item["artist_link"]}
              listen_link={item["listen_link"]}
              mediaClass="listen-media"
              getOverlayData={getOverlayData}
              id={item["id"]}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
