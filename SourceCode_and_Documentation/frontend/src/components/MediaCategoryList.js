import React from "react";
import { ListenMedia } from "./ListenMedia";
import { WatchMedia } from "./WatchMedia";

// This is our category lists component. For now we just vary this with the labelling.
export function MediaCategoryList(props) {
  if (props.media === "WATCH") {
    console.log(`In cat list this is the data: ${props.mediaContent}`);
    return (
      <WatchMedia category={props.category} content={props.mediaContent} />
    );
  }
  return <ListenMedia category={props.category} mediaType={props.mediaType} />;
}
