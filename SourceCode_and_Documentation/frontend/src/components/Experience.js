import React from "react";
import { WatchExperience } from "./WatchExperience";
import { ListenExperience } from "./ListenExperience";

export function Experience({ currentExperience, watchData, listenData }) {
  if (currentExperience === "WATCH") {
    return <WatchExperience data={watchData} />;
  }
  return <ListenExperience data={listenData} />;
}
