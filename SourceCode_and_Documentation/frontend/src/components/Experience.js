import React from "react";
import { WatchExperience } from "./WatchExperience";
import { ListenExperience } from "./ListenExperience";

export function Experience({ currentExperience, watchData, listenData }) {
  console.log(`In experience this is the data: ${watchData}`);
  if (currentExperience === "WATCH") {
    return <WatchExperience data={watchData} />;
  }
  return <ListenExperience data={listenData} />;
}
