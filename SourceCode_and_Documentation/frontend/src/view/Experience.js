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
      />
    );
  } else {
    return (
      <ListenExperience
        listen={listen}
        searchQuery={searchQuery}
        getOverlayData={getOverlayData}
      />
    );
  }
}
