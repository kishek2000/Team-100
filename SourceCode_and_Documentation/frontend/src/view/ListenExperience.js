import React from "react";
import { MediaCategoryList } from "./MediaCategoryList";
import svg from "../images/tail-spin.svg";

// This function will give us the complete Listen experience!
export function ListenExperience({ listen, searchQuery, getOverlayData }) {
  const { data } = listen;
  if (Object.keys(data).length > 0) {
    if (searchQuery.length > 0 && !data["Search Results"]) {
      console.log("yo");
      console.table(data);
      return (
        <div className="loading-screen">
          <div className="loading-text">LOADING SEARCH RESULTS...</div>
          <img src={svg} alt="load" className="loader" />
        </div>
      );
    } else if (searchQuery.length > 0 && data["Search Results"]) {
      const album_matches = data["Search Results"]["Album Results"];
      const track_matches = data["Search Results"]["Track Results"];
      const podcast_matches = data["Search Results"]["Podcast Results"];
      return (
        <div className="search-results">
          <div className="search-results-title">
            Search Results for {searchQuery}
          </div>
          <div className="search-listen-lists">
            <MediaCategoryList
              category="Album, Single and Compilation Results"
              media="LISTEN"
              type="Track"
              mediaContent={album_matches}
              getOverlayData={getOverlayData}
              num="0"
            />
            <MediaCategoryList
              category="Track Results"
              media="LISTEN"
              type="Album"
              mediaContent={track_matches}
              getOverlayData={getOverlayData}
              num="1"
            />
            <MediaCategoryList
              category="Podcast Results"
              type="Podcast"
              media="LISTEN"
              mediaContent={podcast_matches}
              getOverlayData={getOverlayData}
              num="2"
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="listen-experience-lists">
          <MediaCategoryList
            category="New Releases"
            media="LISTEN"
            mediaContent={data["New Releases"]}
            getOverlayData={getOverlayData}
            num="0"
          />
          <MediaCategoryList
            category="Featured Playlists"
            media="LISTEN"
            type="Playlist"
            mediaContent={data["Featured Playlists"]}
            getOverlayData={getOverlayData}
            num="1"
          />
          <MediaCategoryList
            category="Popular Categories"
            media="LISTEN"
            num="2"
            type="Category"
            // mediaContent={data}
            // getOverlayData={getOverlayData}
          />
        </div>
      );
    }
  } else {
    // TODO: add loading state
    return (
      <div className="loading-screen">
        <div className="loading-text">LOADING LISTEN ITEMS...</div>
        <img src={svg} alt="load" className="loader" />
      </div>
    );
  }
}
