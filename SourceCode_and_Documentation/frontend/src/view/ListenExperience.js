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
          {album_matches.length > 0 ||
          track_matches.length > 0 ||
          podcast_matches.length > 0 ? (
            <div>
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
          ) : (
            <div className="category-title">Sorry! No results were found.</div>
          )}
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
            <ListenCategoryPlaylists
              listenCategoryData={listenCategoryData}
              getOverlayData={getOverlayData}
              getListenLink={getListenLink}
              currentCat={selectedCat}
            />
            <Dropdown
              options={LISTENCATEGORIES["items"]}
              getData={getListenCatPlaylist}
              setSelection={setSelectedCat}
              class="listen-category-playlists"
              default={{
                value: selectedCat["value"],
                label: selectedCat["label"],
              }}
            />
          </div>
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
  if (Object.keys(listenCategoryData).length > 0) {
    var category = "";
    if (typeof currentCat !== "string") {
      category = currentCat["label"];
    } else {
      category = currentCat;
    }
    return (
      <div>
        <MediaCategoryList
          category={`${category} Playlists`}
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
