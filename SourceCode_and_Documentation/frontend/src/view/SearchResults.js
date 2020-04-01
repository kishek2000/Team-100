import React from "react";

export function SearchResults(props) {
  const searchQuery = props.query;
  const mediaType = props.media;
  // const searchData = SearchMedia(mediaType);
  return (
    <div className="search-results">
      <div className="search-title">
        {mediaType} Results for: "{searchQuery}"
      </div>
    </div>
  );
}
