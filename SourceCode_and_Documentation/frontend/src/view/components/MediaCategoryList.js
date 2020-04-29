/*
  This is our category list component, the most reused and important one for our app where we see 
  all the information for either watch or listen media.
*/

import React from "react";
import { ListenMedia } from "./ListenMedia";
import { WatchMedia } from "./WatchMedia";

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
        num={typeof props.num === "function" ? props.num() : props.num}
        setMovGenresSelected={props.setMovGenresSelected}
        setTVGenresSelected={props.setTVGenresSelected}
        getWatchData={props.getWatchData}
        getWatchFilteredData={props.getWatchFilteredData}
        movieGenreOptions={props.movieGenreOptions}
        tvGenreOptions={props.tvGenreOptions}
        tvGenresSelected={props.tvGenresSelected}
        movGenresSelected={props.movGenresSelected}
        watchCategory={props.watchCategory}
        watchMode={props.watchMode}
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
