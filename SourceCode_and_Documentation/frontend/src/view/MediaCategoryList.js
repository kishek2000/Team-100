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
        getOverlayData={props.getOverlayData}
        getOverlayServices={props.getOverlayServices}
        getWatchScore={props.getWatchScore}
        getTVEpScores={props.getTVEpScores}
        num={props.num}
      />
    );
  }
  return (
    <div>
      <ListenMedia
        category={props.category}
        content={props.mediaContent}
        type={props.type}
        getOverlayData={props.getOverlayData}
        getListenLink={props.getListenLink}
        num={props.num}
      />
    </div>
  );
}
