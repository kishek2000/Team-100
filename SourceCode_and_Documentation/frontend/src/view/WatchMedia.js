import React from "react";

export function WatchMedia({
  category,
  content,
  setOpenOverlayID,
  setOpenOverlayCategory,
}) {
  if (content !== undefined) {
    const contentStart = content.slice(0, 5);
    return (
      <div className="category-list">
        <p className="category-title">{category}</p>
        <div className="category-media">
          {contentStart.map((item, index) => (
            <div className="media-template">
              <img
                index={index}
                src={item["imgURL"]}
                className="media-image"
                alt="media"
                onClick={() => {
                  setOpenOverlayID(item["id"]);
                  setOpenOverlayCategory({ category });
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
