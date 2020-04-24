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
        getWatchFilteredData,
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
        overlayReview,
        overlayEpisodeReviews,
        getWatchScore,
        getTVEpScores,
        setOverlayReview,
        setOverlayEpisodeReviews,
        listenYTLink,
        getListenLink,
        setListenYTLink,
        listenCategoryData,
        setListenCategoryData,
        getListenCatPlaylist,
        selectedCat,
        setSelectedCat,
        filterSelected,
        setFilterSelected,
        movGenresSelected,
        setMovGenresSelected,
        tvGenresSelected,
        setTVGenresSelected,
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
            watchReviewData={overlayReview}
            tvReviewData={overlayEpisodeReviews}
            setOverlayReview={setOverlayReview}
            setOverlayEpisodeReviews={setOverlayEpisodeReviews}
            listenYTLink={listenYTLink}
            setListenYTLink={setListenYTLink}
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
            getWatchFilteredData={getWatchFilteredData}
            getWatchScore={getWatchScore}
            getTVEpScores={getTVEpScores}
            getListenLink={getListenLink}
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
            listenCategoryData={listenCategoryData}
            setListenCategoryData={setListenCategoryData}
            getListenCatPlaylist={getListenCatPlaylist}
            selectedCat={selectedCat}
            setSelectedCat={setSelectedCat}
            filterSelected={filterSelected}
            setFilterSelected={setFilterSelected}
            movGenresSelected={movGenresSelected}
            setMovGenresSelected={setMovGenresSelected}
            tvGenresSelected={tvGenresSelected}
            setTVGenresSelected={setTVGenresSelected}
          />
        </div>
      )}
    </AppContainer>
  );
}

export default App;
