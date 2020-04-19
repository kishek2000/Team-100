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
          />
        );
      } else {
        return (
          <ListenOverlay
            media_data={media_data}
            setOpenOverlayID={setOpenOverlayID}
            setOverlayData={setOverlayData}
          />
        );
      }
    }
  }
  return <div></div>;
}
