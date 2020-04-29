/*
  This is the navigation component for the listen media lists. The difference is it has a stronger scroll effect.
*/

import React from "react";

export function ListenMediaNav({ num }) {
  return (
    <div>
      <img
        src="https://img.icons8.com/cotton/64/000000/circled-chevron-right.png"
        alt="next"
        className="next"
        onClick={() => {
          document.getElementsByClassName("listen-category-media")[
            num
          ].scrollLeft += 0.78 * window.innerWidth;
        }}
      />
      <img
        src="https://img.icons8.com/cotton/64/000000/circled-chevron-left.png"
        alt="prev"
        className="prev"
        onClick={() => {
          document.getElementsByClassName("listen-category-media")[
            num
          ].scrollLeft -= window.innerWidth;
        }}
      />
    </div>
  );
}
