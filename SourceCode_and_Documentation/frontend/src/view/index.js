import React from "react";

import "../static/AppMediaStyle.css";
import "../static/Header.css";
import "../static/LoadingScreen.css";
import "../static/Overlay.css";
import "../static/Search.css";
import "../static/Theme.css";
import "../static/Transitions.css";
import "../static/StarRating.css";

import { AppHeader } from "./AppHeader";
import { AppBody } from "./AppBody";
import { AppContainer } from "../state";
import { Overlay } from "./Overlay";

function App() {
  return (
    <AppContainer>
      {({
        mediaSelected,
        onMediaChange,
        watch,
        listen,
        overlay,
        onSearchQuery,
        getWatchData,
        getListenData,
        setSearchQuery,
        searchQuery,
        openOverlayID,
        setOpenOverlayID,
        getOverlayData,
        setOverlayData,
        getServiceOptions,
        serviceOptions,
        serviceSelections,
        setServiceSelections,
        region,
        setRegion,
        getOverlayServices,
        overlayServices,
        setOverlayServices,
      }) => (
        <div className="App">
          <Overlay
            data={overlay}
            experience={mediaSelected}
            setOpenOverlayID={setOpenOverlayID}
            media_id={openOverlayID}
            setOverlayData={setOverlayData}
            servicesData={overlayServices}
            setServicesData={setOverlayServices}
          />
          <AppHeader
            mediaSelected={mediaSelected}
            onSearchQuery={onSearchQuery}
            getWatchData={getWatchData}
            getListenData={getListenData}
            setSearchQuery={setSearchQuery}
          />
          <AppBody
            mediaSelected={mediaSelected}
            onMediaChange={onMediaChange}
            onSearchQuery={onSearchQuery}
            getWatchData={getWatchData}
            getListenData={getListenData}
            watch={watch}
            listen={listen}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
            getOverlayData={getOverlayData}
            getServiceOptions={getServiceOptions}
            serviceOptions={serviceOptions}
            serviceSelections={serviceSelections}
            setServiceSelections={setServiceSelections}
            region={region}
            setRegion={setRegion}
            getOverlayServices={getOverlayServices}
            overlayServices={overlayServices}
          />
        </div>
      )}
    </AppContainer>
  );
}

export default App;
