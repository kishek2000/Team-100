import React from "react";
import { ListenSet } from "./ListenSet";

export function ListenMedia({ category, content }) {
  if (content !== undefined) {
    return (
      <div className="category-list">
        <p className="category-title">{category}</p>
        <div className="category-media">
          <ListenSet
            setClass="listen-set-first"
            imageSource={content[0]["imgURL"]}
            title={content[0]["music_name"]}
            subtext={content[0]["type"]}
            artist={content[0]["artist_name"]}
            artist_link={content[0]["artist_link"]}
            music_link={content[0]["music_link"]}
            mediaClass="listen-media-first"
          />

          <ListenSet
            setClass="listen-set-middle"
            imageSource={content[1]["imgURL"]}
            title={content[1]["music_name"]}
            subtext={content[1]["type"]}
            artist={content[1]["artist_name"]}
            artist_link={content[1]["artist_link"]}
            music_link={content[1]["music_link"]}
            mediaClass="listen-media-middle"
          />

          <ListenSet
            setClass="listen-set-middle"
            imageSource={content[2]["imgURL"]}
            title={content[2]["music_name"]}
            subtext={content[2]["type"]}
            artist={content[2]["artist_name"]}
            artist_link={content[2]["artist_link"]}
            music_link={content[2]["music_link"]}
            mediaClass="listen-media-middle"
          />

          <ListenSet
            setClass="listen-set-last"
            imageSource={content[3]["imgURL"]}
            title={content[3]["music_name"]}
            subtext={content[3]["type"]}
            artist={content[3]["artist_name"]}
            artist_link={content[3]["artist_link"]}
            music_link={content[3]["music_link"]}
            mediaClass="listen-media-last"
            alt="listen-media"
          />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
