import React from "react";
import { WatchExperience } from "./WatchExperience";
import { ListenExperience } from "./ListenExperience";

export function Experience({ currentExperience }) {
  if (currentExperience === "WATCH") {
    return <WatchExperience />;
  }
  return <ListenExperience />;
}
