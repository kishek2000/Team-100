import React from "react";
import { MediaCategoryList } from "./MediaCategoryList";
// import { MediaGenreList } from "./MediaGenreList";
// import { LISTEN_GENRES } from "../constants";

// This function will give us the complete Listen experience!
export function ListenExperience({
  listen,
  searchQuery,
  setOpenOverlayID,
  setOpenOverlayCategory,
}) {
  const { data } = listen;
  if (Object.keys(data).length > 0) {
    if (searchQuery.length > 0 && !data["Search Results"]) {
      console.table(data);
      return (
        <div className="loading-screen">
          <div className="loading-text">LOADING SEARCH DATA</div>
          <div className="loader"></div>
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
              setOpenOverlayID={setOpenOverlayID}
              setOpenOverlayCategory={setOpenOverlayCategory}
            />
            <MediaCategoryList
              category="Track Results"
              media="LISTEN"
              type="Album"
              mediaContent={track_matches}
              setOpenOverlayID={setOpenOverlayID}
              setOpenOverlayCategory={setOpenOverlayCategory}
            />
            <MediaCategoryList
              category="Podcast Results"
              type="Podcast"
              media="LISTEN"
              mediaContent={podcast_matches}
              setOpenOverlayID={setOpenOverlayID}
              setOpenOverlayCategory={setOpenOverlayCategory}
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
            setOpenOverlayID={setOpenOverlayID}
            setOpenOverlayCategory={setOpenOverlayCategory}
          />
          <MediaCategoryList
            category="Featured Playlists"
            media="LISTEN"
            type="Playlist"
            mediaContent={data["Featured Playlists"]}
            setOpenOverlayID={setOpenOverlayID}
            setOpenOverlayCategory={setOpenOverlayCategory}
          />
          <MediaCategoryList
            category="Top Rated Podcasts"
            media="LISTEN"
            // mediaContent={data}
            // setOpenOverlayID={setOpenOverlayID}
            // setOpenOverlayCategory={setOpenOverlayCategory}
          />
          {/* <MediaGenreList media="LISTEN" genres={LISTEN_GENRES} /> */}
        </div>
      );
    }
  } else {
    // TODO: add loading state
    return (
      <div className="loading-screen">
        <div className="loading-text">LOADING LISTEN DATA</div>
        <div className="loader"></div>
      </div>
    );
  }
}
