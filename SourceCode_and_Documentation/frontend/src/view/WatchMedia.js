import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export function WatchMedia({
  category,
  content,
  setOpenOverlayID,
  setOpenOverlayCategory,
}) {
  if (content !== undefined) {
    const contentStart = content.slice(0, 10);
    console.table(contentStart);
    return (
      <div className="category-list">
        <p className="category-title">{category}</p>
        <div className="category-media">
          {contentStart.map((item, index) => (
            <div className="media-template">
              <div className="media-image-wrapper">
                {/* <CircularProgressbar
                  value={item["score"]}
                  maxValue={1}
                  text={item["score"] * 10}
                /> */}
                <img
                  index={index}
                  src={item["imgURL"]}
                  className="media-image"
                  alt="media"
                  onClick={() => {
                    setOpenOverlayID(item["id"]);
                    setOpenOverlayCategory({ category });
                  }}
                  // onMouseOver={() => {}}
                />
              </div>
              <p className="watch-title">{item["name"]}</p>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
