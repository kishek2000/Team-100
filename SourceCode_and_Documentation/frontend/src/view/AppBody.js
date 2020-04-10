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
        document.getElementById("color-mode-text").innerText = isDark
          ? "Light Mode"
          : "Dark Mode";
      }}
    >
      <span id="color-mode-text">Dark Mode</span>
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
