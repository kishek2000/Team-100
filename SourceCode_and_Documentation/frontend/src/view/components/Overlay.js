/*
  This component has a conditional render of the listen or watch overlay for a specified item.
*/

import React from "react";
import { WatchOverlay } from "./WatchOverlay";
import { ListenOverlay } from "./ListenOverlay";

export function Overlay({
  experience,
  data,
  setOpenOverlayID,
  media_id,
  setOverlayData,
  servicesData,
  setServicesData,
  watchReviewData,
  tvReviewData,
  setOverlayReview,
  setOverlayEpisodeReviews,
  listenYTLink,
  setListenYTLink,
}) {
  // const id, media = media_id.split()
  if (Object.keys(data).length > 0 && media_id !== -1) {
    const record = data["data"];
    if (Object.keys(record).length > 0) {
      const media_data = record[0];
      if (experience === "WATCH") {
        return (
          <WatchOverlay
            media_data={media_data}
            setOpenOverlayID={setOpenOverlayID}
            setOverlayData={setOverlayData}
            servicesData={servicesData}
            setServicesData={setServicesData}
            watchReviewData={watchReviewData}
            tvReviewData={tvReviewData}
            setOverlayReview={setOverlayReview}
            setOverlayEpisodeReviews={setOverlayEpisodeReviews}
          />
        );
      } else {
        return (
          <ListenOverlay
            media_data={media_data}
            setOpenOverlayID={setOpenOverlayID}
            setOverlayData={setOverlayData}
            listenYTLink={listenYTLink}
            setListenYTLink={setListenYTLink}
          />
        );
      }
    }
  }
  return <div></div>;
}
