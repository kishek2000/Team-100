import React from "react";

import { Experience } from "./Experience";
import { SearchBar } from "./SearchBar";
import { MediaSelector } from "./MediaSelector";
import { OPTIONS, SEARCHTEXT } from "../constants";

var isDark = false;

export const AppBody = ({
  mediaSelected,
  onMediaChange,
  watch,
  listen,
  onSearchQuery,
  getWatchData,
  getListenData,
  setSearchQuery,
  searchQuery,
  setOpenOverlayID,
  setOpenOverlayCategory,
}) => (
  <section className="App-media-options">
    <button
      className="color-mode"
      onClick={() => {
        var element = document.body;
        element.classList.toggle("dark-mode");
        isDark = !isDark;
        document.getElementById("color-mode-img").innerHTML = isDark
          ? "<img class='light-mode-vector' src='https://img.icons8.com/android/48/000000/sun.png' alt='light-mode'/>"
          : "<img class='dark-mode-vector' src='https://img.icons8.com/ios/50/000000/crescent-moon.png' alt='dark-mode'/>";
      }}
    >
      <span id="color-mode-img">
        <img
          className="dark-mode-vector"
          src="https://img.icons8.com/ios/50/000000/crescent-moon.png"
          alt="dark-mode"
        />
      </span>
    </button>
    <div className="filters-header">
      <div className="media-selection">
        <p className="selection-label">I want to</p>
        {OPTIONS.map((option) => (
          <MediaSelector
            key={option}
            option={option}
            isSelected={mediaSelected === option}
            onClick={(option) => {
              onMediaChange(option);
            }}
          />
        ))}
      </div>
      {/* <div className="region-selector">Region: AU</div> */}
      <SearchBar
        name="searchbar"
        inputname="searchinput"
        imagename="searchbutton"
        placeholder={SEARCHTEXT[mediaSelected]}
        onSearchQuery={onSearchQuery}
        original={watch}
        getWatchData={getWatchData}
        getListenData={getListenData}
        setSearchQuery={setSearchQuery}
        mediaSelected={mediaSelected}
      />
    </div>
    <Experience
      currentExperience={mediaSelected}
      watch={watch}
      listen={listen}
      searchQuery={searchQuery}
      setOpenOverlayID={setOpenOverlayID}
      setOpenOverlayCategory={setOpenOverlayCategory}
    />
  </section>
);
