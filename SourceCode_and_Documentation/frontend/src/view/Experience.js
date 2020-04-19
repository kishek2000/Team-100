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
}) {
  if (currentExperience === "WATCH") {
    return (
      <WatchExperience
        watch={watch}
        searchQuery={searchQuery}
        getOverlayData={getOverlayData}
        getOverlayServices={getOverlayServices}
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
