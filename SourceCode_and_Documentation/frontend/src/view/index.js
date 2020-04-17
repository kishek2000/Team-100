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
      }) => (
        <div className="App">
          <Overlay
            data={overlay}
            experience={mediaSelected}
            setOpenOverlayID={setOpenOverlayID}
            media_id={openOverlayID}
            setOverlayData={setOverlayData}
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
          />
        </div>
      )}
    </AppContainer>
  );
}

export default App;
