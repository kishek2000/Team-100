import React from 'react'

// This now is our media selection component. This only varies in its list, which you can provide.
export function MediaSelector({ isSelected, option, onClick }) {
  return (
    <button
      className={`media-button ${isSelected && 'selected'}`}
      onClick={() => onClick(option)}
    >
      <div class="media-button-wrapper">
        <span class="media-button-text">{option}</span>
      </div>
    </button>
  )
}