import React from "react";

import { SearchBar } from "./SearchBar";
import Clock from "react-live-clock";
import { TIME } from "../constants/index";

export const AppHeader = ({
  mediaSelected,
  onSearchQuery,
  getWatchData,
  getListenData,
  setSearchQuery,
}) => (
  <header className="App-header">
    <Clock className="time" ticking={true} format={"HH:mm:ss"} />
    <div className="date-text">
      {TIME()["day"]} the {TIME()["date"]} of {TIME()["month"]},{" "}
      {TIME()["year"]}
    </div>
    <div className="header-contents">
      <p className="myLounge-heading">myLounge</p>
      <p className="myLounge-subtitle">Listen. Watch. Relax.</p>
      <SearchBar
        name="searchbar-menu"
        inputname="searchinput-menu"
        imagename="searchbutton-menu"
        placeholder="Search for Movie, TV Show, Podcast or Music by name..."
        onSearchQuery={onSearchQuery}
        getWatchData={getWatchData}
        getListenData={getListenData}
        setSearchQuery={setSearchQuery}
        mediaSelected={mediaSelected}
      />
    </div>
  </header>
);
