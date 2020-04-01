import React from "react";
import { ListenSet } from "./ListenSet";

export function ListenMedia({ category, content }) {
  console.log("hello");
  console.table(content);
  if (content !== undefined) {
    const contentStart = content;
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
