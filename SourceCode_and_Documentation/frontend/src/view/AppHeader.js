import React from "react";

import { SearchBar } from "./SearchBar";

export const AppHeader = ({
  mediaSelected,
  onSearchQuery,
  getWatchData,
  getListenData,
  setSearchQuery,
}) => (
  <header className="App-header">
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
  </header>
);
