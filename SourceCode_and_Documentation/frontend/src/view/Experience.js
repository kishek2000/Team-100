import React from "react";
import { WatchExperience } from "./WatchExperience";
import { ListenExperience } from "./ListenExperience";

export function Experience({ currentExperience, watch, listen, searchQuery }) {
  if (currentExperience === "WATCH") {
    return <WatchExperience watch={watch} searchQuery={searchQuery} />;
  } else {
    console.log("now rendering listen experience");
    return <ListenExperience listen={listen} />;
  }
}
