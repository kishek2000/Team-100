import React from "react";

function WatchMediaMetadata({ airDate, language, rating }) {
  return [airDate, language, rating].filter((item) => !!item).join(" | ");
}

export function WatchMedia({
  category,
  content,
  getOverlayData,
  setOpenOverlayCategory,
  num,
}) {
  if (content !== undefined) {
    const contentStart = content.slice(0, 14);
    return (
      <div className="category-list">
        <p className="category-title">{category}</p>
        <div className="category-media" >
          <button className = "prev" onClick= {() =>{
            document.getElementsByClassName("category-media")[num].scrollLeft-=190;
          }}
          />
          <button className = "next" onClick= {() =>{
            console.log(num);
            document.getElementsByClassName("category-media")[num].scrollLeft+=190;
          }}
          />
          {contentStart.map((item, index) => (
            <div className="media-template">
              <div className="media-image-wrapper">
                <div className="media-user-score">
                  <span className="user-score-text">
                    {Math.round(item["score"] * 1000) / 10}%
                  </span>
                </div>
                <img
                  index={index}
                  src={item["imgURL"]}
                  className="media-image"
                  alt="media"
                  onClick={() => {
                    getOverlayData(item["id"], item["type"]);
                  }}
                />
              </div>
              <p className="watch-title">{item["name"]}</p>
              <div className="watch-metadata">
                <WatchMediaMetadata
                  airDate={item["first_air_date"]}
                  language={item["lang"]}
                  rating={item["content_rating"]}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
