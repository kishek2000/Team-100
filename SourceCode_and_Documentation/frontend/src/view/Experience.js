import React from "react";
import { WatchExperience } from "./WatchExperience";
import { ListenExperience } from "./ListenExperience";

export function Experience({
  currentExperience,
  watch,
  listen,
  searchQuery,
  setOpenOverlayID,
  setOpenOverlayCategory,
}) {
  if (currentExperience === "WATCH") {
    return (
      <WatchExperience
        watch={watch}
        searchQuery={searchQuery}
        setOpenOverlayID={setOpenOverlayID}
        setOpenOverlayCategory={setOpenOverlayCategory}
      />
    );
  } else {
    return (
      <ListenExperience
        listen={listen}
        searchQuery={searchQuery}
        setOpenOverlayID={setOpenOverlayID}
        setOpenOverlayCategory={setOpenOverlayCategory}
      />
    );
  }
}
