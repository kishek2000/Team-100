import React from "react";
import { WatchExperience } from "./WatchExperience";
import { ListenExperience } from "./ListenExperience";

export function Experience({
  currentExperience,
  watch,
  listen,
  searchQuery,
  getOverlayData,
}) {
  if (currentExperience === "WATCH") {
    return (
      <WatchExperience
        watch={watch}
        searchQuery={searchQuery}
        getOverlayData={getOverlayData}
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
