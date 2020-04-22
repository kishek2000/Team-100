import React from "react";
import { MediaCategoryList } from "./MediaCategoryList";
import LoadingSpinner from "../images/tail-spin.svg";
import { Dropdown } from "./Dropdown";
import { LISTENCATEGORIES } from "../constants/index";

// This function will give us the complete Listen experience!
export function ListenExperience({
  listen,
  searchQuery,
  getOverlayData,
  getListenLink,
  listenCategoryData,
  getListenCatPlaylist,
  selectedCat,
  setSelectedCat,
}) {
  const { data } = listen;
  console.log(getListenLink);
  if (Object.keys(data).length > 0) {
    if (searchQuery.length > 0 && !data["Search Results"]) {
      return (
        <div className="loading-screen">
          <div className="loading-text">LOADING SEARCH RESULTS...</div>
          <img src={LoadingSpinner} alt="load" className="loader" />
        </div>
      );
    } else if (searchQuery.length === 0 && data["Search Results"]) {
      return (
        <div className="loading-screen">
          <div className="loading-text">LOADING LISTEN ITEMS...</div>
          <img src={LoadingSpinner} alt="load" className="loader" />
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
              getListenLink={getListenLink}
              num="0"
            />
            <MediaCategoryList
              category="Track Results"
              media="LISTEN"
              type="Album"
              mediaContent={track_matches}
              getOverlayData={getOverlayData}
              getListenLink={getListenLink}
              num="1"
            />
            <MediaCategoryList
              category="Podcast Results"
              type="Podcast"
              media="LISTEN"
              mediaContent={podcast_matches}
              getOverlayData={getOverlayData}
              getListenLink={getListenLink}
              num="2"
            />
          </div>
        </div>
      );
    } else {
      console.log("Just got here now!");
      console.log(data);
      return (
        <div className="listen-experience-lists">
          <MediaCategoryList
            category="New Releases"
            media="LISTEN"
            mediaContent={data["New Releases"]}
            getOverlayData={getOverlayData}
            getListenLink={getListenLink}
            num="0"
          />
          <MediaCategoryList
            category="Featured Playlists"
            media="LISTEN"
            type="Playlist"
            mediaContent={data["Featured Playlists"]}
            getOverlayData={getOverlayData}
            getListenLink={getListenLink}
            num="1"
          />
          <div className="listen-categories">
            <div className="category-title">Choose a Category:</div>
            <Dropdown
              options={LISTENCATEGORIES["items"]}
              setData={getListenCatPlaylist}
              setSelection={setSelectedCat}
              class="listen-category-playlists"
            />
          </div>
          <ListenCategoryPlaylists
            listenCategoryData={listenCategoryData}
            getOverlayData={getOverlayData}
            getListenLink={getListenLink}
            currentCat={selectedCat}
          />
        </div>
      );
    }
  } else {
    // TODO: add loading state
    return (
      <div className="loading-screen">
        <div className="loading-text">LOADING LISTEN ITEMS...</div>
        <img src={LoadingSpinner} alt="load" className="loader" />
      </div>
    );
  }
}

function ListenCategoryPlaylists({
  listenCategoryData,
  getOverlayData,
  getListenLink,
  currentCat,
}) {
  console.log(currentCat);
  if (Object.keys(listenCategoryData).length > 0) {
    return (
      <div>
        <MediaCategoryList
          category={`${currentCat} Playlists`}
          media="LISTEN"
          type="Playlist"
          mediaContent={listenCategoryData}
          getOverlayData={getOverlayData}
          getListenLink={getListenLink}
          num="2"
        />
      </div>
    );
  }
  return <div></div>;
}
