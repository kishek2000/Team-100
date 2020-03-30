import React from "react";
export function WatchMedia({ category, content }) {
  // [{'name': 'Thieves of the Wood', 'imgURL': 'https://image.tmdb.org/t/p/original/jQNOzoiaIQWxJAx8OUighnvnhRA.jpg'}, {'name': 'Westworld', 'imgURL': 'https://image.tmdb.org/t/p/original/y55oBgf6bVMI7sFNXwJDrSIxPQt.jpg'}, {'name': 'Ozark', 'imgURL': 'https://image.tmdb.org/t/p/original/oy7Peo5iFIt9sNM59lN6csbJeX2.jpg'}, {'name': 'True Cooking Master Boy', 'imgURL': 'https://image.tmdb.org/t/p/original/mg2fUxfH3ktaWqbSq4oL3g3yyCm.jpg'}]
  if (content !== undefined) {
    return (
      <div className="category-list">
        <p className="category-title">{category}</p>
        <div className="category-media">
          <img
            src={content[0]["imgURL"]}
            className="media-template-first"
            alt="media"
          />
          <img
            src={content[1]["imgURL"]}
            className="media-template-middle"
            alt="media"
          />
          <img
            src={content[2]["imgURL"]}
            className="media-template-middle"
            alt="media"
          />
          <img
            src={content[3]["imgURL"]}
            className="media-template-last"
            alt="media"
          />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
