import React from "react";
import "../App.css";

import { AppHeader } from "./AppHeader";
import { AppBody } from "./AppBody";
import { AppContainer } from "../state";

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
        searchQuery
      }) => (
        <div className="App">
          <AppHeader />
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
          />
        </div>
      )}
    </AppContainer>
  );
}

export default App;
