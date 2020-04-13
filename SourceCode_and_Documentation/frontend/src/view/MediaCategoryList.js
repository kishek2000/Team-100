import React from "react";
import { ListenMedia } from "./ListenMedia";
import { WatchMedia } from "./WatchMedia";

// This is our category lists component. For now we just vary this with the labelling.
export function MediaCategoryList(props) {
  if (props.media === "WATCH") {
    return (
      <WatchMedia
        category={props.category}
        content={props.mediaContent}
        setOpenOverlayID={props.setOpenOverlayID}
        setOpenOverlayCategory={props.setOpenOverlayCategory}
      />
    );
  }
  return (
    <ListenMedia
      category={props.category}
      content={props.mediaContent}
      type={props.type}
      setOpenOverlayID={props.setOpenOverlayID}
      setOpenOverlayCategory={props.setOpenOverlayCategory}
    />
  );
}
