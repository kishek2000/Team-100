/*
  This is our media selection component, from the fixed header.
*/

import React from "react";

export function MediaSelector({ isSelected, option, onClick }) {
  return (
    <button
      className={`media-button ${isSelected && "selected"}`}
      onClick={() => onClick(option)}
    >
      <div className="media-button-wrapper">
        <span className="media-button-text">{option}</span>
      </div>
    </button>
  );
}
