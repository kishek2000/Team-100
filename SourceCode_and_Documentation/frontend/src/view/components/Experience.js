/*
  This file is the component of the main app experience as a whole. It conditionally renders Watch or Listen experience based on the selection in the fixed header. 
*/

import React from "react";
import { WatchExperience } from "./WatchExperience";
import { ListenExperience } from "./ListenExperience";

export function Experience({
  currentExperience,
  watch,
  listen,
  searchQuery,
  getOverlayData,
  getOverlayServices,
  getWatchScore,
  getTVEpScores,
  getListenLink,
  listenCategoryData,
  setListenCategoryData,
  getListenCatPlaylist,
  selectedCat,
  setSelectedCat,
  setSearchQuery,
  setMovGenresSelected,
  setTVGenresSelected,
  getWatchData,
  getWatchFilteredData,
  tvGenreOptions,
  tvGenresSelected,
  movGenresSelected,
  movieGenreOptions,
}) {
  if (currentExperience === "WATCH") {
    return (
      <WatchExperience
        watch={watch}
        searchQuery={searchQuery}
        getOverlayData={getOverlayData}
        getOverlayServices={getOverlayServices}
        getWatchScore={getWatchScore}
        getTVEpScores={getTVEpScores}
        setSearchQuery={setSearchQuery}
        setMovGenresSelected={setMovGenresSelected}
        setTVGenresSelected={setTVGenresSelected}
        getWatchData={getWatchData}
        getWatchFilteredData={getWatchFilteredData}
        movieGenreOptions={movieGenreOptions}
        tvGenreOptions={tvGenreOptions}
        tvGenresSelected={tvGenresSelected}
        movGenresSelected={movGenresSelected}
      />
    );
  } else {
    return (
      <ListenExperience
        listen={listen}
        searchQuery={searchQuery}
        getOverlayData={getOverlayData}
        getListenLink={getListenLink}
        listenCategoryData={listenCategoryData}
        setListenCategoryData={setListenCategoryData}
        getListenCatPlaylist={getListenCatPlaylist}
        selectedCat={selectedCat}
        setSelectedCat={setSelectedCat}
        setSearchQuery={setSearchQuery}
      />
    );
  }
}
