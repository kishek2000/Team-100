import React from "react";

import { Experience } from "./Experience";
import { SearchBar } from "./SearchBar";
import { MediaSelector } from "./MediaSelector";
import { OPTIONS, SEARCHTEXT } from "../constants";

export const AppBody = ({
  mediaSelected,
  onMediaChange,
  watch,
  listen,
  onSearchQuery,
  getWatchData,
  getListenData,
  setSearchQuery,
  searchQuery
}) => (
  <section className="App-media-options">
    <div className="filters-header">
      <div className="media-selection">
        <p className="selection-label">I want to</p>
        {OPTIONS.map(option => (
          <MediaSelector
            key={option}
            option={option}
            isSelected={mediaSelected === option}
            onClick={option => {
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
        experience="WATCH"
        original={watch}
        getWatchData={getWatchData}
        setSearchQuery={setSearchQuery}
      />
    </div>
    <Experience
      currentExperience={mediaSelected}
      watch={watch}
      listen={listen}
      searchQuery={searchQuery}
    />
  </section>
);
