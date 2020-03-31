import React from "react";

function handleOverlay(index, content) {
  if (content !== undefined) {
    document.getElementById("overlay").style.display = "flex";
    document.getElementById(
      "overlay-poster"
    ).innerHTML = `<img src=${content[index]["imgURL"]} id="overlay-poster"/>`;
    document.getElementById(
      "overlay-title"
    ).innerText = `${content[index]["name"]}`;
    document.getElementById(
      "overlay-genres"
    ).innerText = `${content[index]["genres"]}`;
    document.getElementById(
      "overlay-date"
    ).innerText = `(${content[index]["first_air_date"]})`;
    document.getElementById(
      "overlay-description"
    ).innerText = `${content[index]["overview"]}`;
  }
}

export function WatchMedia({ category, content }) {
  if (content !== undefined) {
    return (
      <div className="category-list">
        <p className="category-title">{category}</p>
        <div className="category-media">
          <img
            src={content[0]["imgURL"]}
            className="media-template-first"
            alt="media"
            onClick={() => {
              handleOverlay(0, content);
            }}
          />
          <img
            src={content[1]["imgURL"]}
            className="media-template-middle"
            alt="media"
            onClick={() => {
              handleOverlay(1, content);
            }}
          />
          <img
            src={content[2]["imgURL"]}
            className="media-template-middle"
            alt="media"
            onClick={() => {
              handleOverlay(2, content);
            }}
          />
          <img
            src={content[3]["imgURL"]}
            className="media-template-last"
            alt="media"
            onClick={() => {
              handleOverlay(3, content);
            }}
          />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
