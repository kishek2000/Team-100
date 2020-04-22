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
