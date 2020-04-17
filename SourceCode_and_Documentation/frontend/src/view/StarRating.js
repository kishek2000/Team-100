import React from "react";

export function Rating(props) {
  let rating = props.rating || 0;
  let stars = [];
  while (stars.length < 5) {
    if (rating > 1) {
      stars.push(1);
    } else if (rating > 0) {
      let empty = Math.abs(0 - rating);
      let quart = Math.abs(0.25 - rating);
      let half = Math.abs(0.5 - rating);
      let three = Math.abs(0.75 - rating);
      let full = Math.abs(1 - rating);
      let closest = Math.min(empty, quart, half, three, full);
      switch (closest) {
        case empty:
          stars.push(0);
          break;
        case quart:
          stars.push(0.28);
          break;
        case half:
          stars.push(0.5);
          break;
        case three:
          stars.push(0.72);
          break;
        case full:
          stars.push(1.0);
          break;
        default:
          console.log("OOPS");
          stars.push(0);
          break;
      }
    } else {
      stars.push(0);
    }
    rating = rating - 1;
  }
  console.log(stars);
  return (
    <div className="star-rating">
      {stars.map((item, i) => {
        return (
          <div className="single-star-container" key={i}>
            <img
              style={{ width: `${parseInt(item * 15)}px` }}
              className="single-star-outline"
              src="https://img.icons8.com/ios-filled/96/000000/star.png"
              alt="stars alt"
            ></img>
          </div>
        );
      })}
    </div>
  );
}
