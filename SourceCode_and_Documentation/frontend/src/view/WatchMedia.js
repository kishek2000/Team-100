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
    const array = content[index]["location"];

    if (array.length === 0) {
      document.getElementById("overlay-streaming-options").innerText =
        "No streaming options are available right now! Come back soon to check again :)";
    } else {
      var str = "<div class='overlay-services'>";
      console.table(array);
      array.forEach(function (array) {
        str +=
          '<a class="link-text" target="_blank" rel="noopener noreferrer" href="' +
          array["link"] +
          '">' +
          array["name"] +
          "</a>";
      });
      str += "</div>";
      document.getElementById("overlay-streaming-options").innerHTML = str;
    }
  }
}

export function WatchMedia({ category, content }) {
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
                  handleOverlay(index, content);
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
