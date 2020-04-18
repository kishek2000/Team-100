import { useState, useEffect, useCallback } from "react";
import { Client } from "../client";

// Instantiate a single instance of the Client, used across
// the application for fetching of data.
const client = new Client("http://localhost:8000");

export function AppContainer({ children }) {
  const [mediaSelected, setMediaSelected] = useState("WATCH");
  const [watchData, setWatchData] = useState({});
  const [listenData, setListenData] = useState({});
  const [searchQuery, setSearchQuery] = useState({});
  const [openOverlayID, setOpenOverlayID] = useState(-1);
  const [overlayData, setOverlayData] = useState({});

  const getWatchData = useCallback(() => {
    client.getWatchData().then((data) => setWatchData(data));
  }, [setWatchData]);

  const getListenData = useCallback(() => {
    client.getListenData().then((data) => setListenData(data));
  }, [setListenData]);

  const onSearchQuery = useCallback(
    (query, experience, services) => {
      if (experience === "WATCH") {
        client.getWatchSearchResults(query, services).then((data) => {
          setWatchData(data);
          setSearchQuery(query);
        });
      } else if (experience === "LISTEN") {
        client.getListenSearchResults(query, services).then((data) => {
          setListenData(data);
          setSearchQuery(query);
        });
      }
    },
    [setSearchQuery, setWatchData, setListenData]
  );

  const getOverlayData = useCallback(
    (mediaId, mediaType) => {
      setOpenOverlayID(mediaId);
      client.getMediaOverlayData(mediaId, mediaType).then((data) => {
        setOverlayData(data);
      });
    },
    [setOverlayData]
  );

  useEffect(() => {
    if (mediaSelected === "WATCH") {
      getWatchData();
    } else {
      getListenData();
    }
  }, [mediaSelected, getWatchData, getListenData]);

  return children({
    mediaSelected: mediaSelected,
    onMediaChange: setMediaSelected,
    onSearchQuery: onSearchQuery,
    getWatchData: getWatchData,
    getListenData: getListenData,
    getOverlayData: getOverlayData,
    watch: { data: watchData, fetch: getWatchData },
    listen: { data: listenData, fetch: getListenData },
    overlay: { data: overlayData },
    setOverlayData: setOverlayData,
    setSearchQuery: setSearchQuery,
    searchQuery: searchQuery,
    openOverlayID: openOverlayID,
    setOpenOverlayID: setOpenOverlayID,
  });
}
