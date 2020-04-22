import React from "react";

import { Experience } from "./Experience";
import { SearchBar } from "./SearchBar";
import { MediaSelector } from "./MediaSelector";
import { OPTIONS, SEARCHTEXT } from "../constants";
import BackToTop from "react-back-to-top-button";

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
  getOverlayData,
  serviceOptions,
  setServiceOptions,
  serviceSelections,
  setServiceSelections,
  region,
  setRegion,
  getServiceOptions,
  getOverlayServices,
  overlayServices,
  getWatchScore,
  getTVEpScores,
  getListenLink,
  listenCategoryData,
  setListenCategoryData,
  getListenCatPlaylist,
  selectedCat,
  setSelectedCat,
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
        searchQuery={searchQuery}
        original={watch}
        getWatchData={getWatchData}
        getListenData={getListenData}
        setSearchQuery={setSearchQuery}
        mediaSelected={mediaSelected}
        setServiceOptions={setServiceOptions}
        serviceOptions={serviceOptions}
        serviceSelections={serviceSelections}
        setServiceSelections={setServiceSelections}
        region={region}
        setRegion={setRegion}
        getServiceOptions={getServiceOptions}
      />
    </div>
    <Experience
      currentExperience={mediaSelected}
      watch={watch}
      listen={listen}
      searchQuery={searchQuery}
      getOverlayData={getOverlayData}
      getOverlayServices={getOverlayServices}
      overlayServices={overlayServices}
      getWatchScore={getWatchScore}
      getTVEpScores={getTVEpScores}
      getListenLink={getListenLink}
      listenCategoryData={listenCategoryData}
      setListenCategoryData={setListenCategoryData}
      getListenCatPlaylist={getListenCatPlaylist}
      selectedCat={selectedCat}
      setSelectedCat={setSelectedCat}
      setSearchQuery={setSearchQuery}
    />
    <BackToTop
      showAt={100}
      speed={1000}
      easing="easeInOutSine"
      children={
        <img
          src="https://img.icons8.com/ios/96/000000/up.png"
          alt="top"
          className="top-arrow"
        />
      }
    />
  </section>
);
