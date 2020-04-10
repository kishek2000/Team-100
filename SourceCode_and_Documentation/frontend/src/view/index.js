import React from "react";
import "../App.css";

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
        onSearchQuery,
        getWatchData,
        getListenData,
        setSearchQuery,
        searchQuery,
        openOverlayID,
        setOpenOverlayID,
        openOverlayCategory,
        setOpenOverlayCategory,
      }) => (
        <div className="App">
          <Overlay
            media_id={openOverlayID}
            setOpenOverlayID={setOpenOverlayID}
            media_category={openOverlayCategory}
            experience={mediaSelected}
            watchData={watch}
            listenData={listen}
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
            setOpenOverlayID={setOpenOverlayID}
            setOpenOverlayCategory={setOpenOverlayCategory}
          />
        </div>
      )}
    </AppContainer>
  );
}

export default App;
