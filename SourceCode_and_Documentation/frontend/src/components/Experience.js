import React from "react";
import { WatchExperience } from "./WatchExperience";
import { ListenExperience } from "./ListenExperience";
// import { SearchResults } from "./SearchResults";

export function Experience({ currentExperience }) {
  if (currentExperience === "WATCH") {
    return <WatchExperience />;
  }
  return <ListenExperience />;
}
