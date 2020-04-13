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
  const [openOverlayCategory, setOpenOverlayCategory] = useState("");

  const getWatchData = useCallback(() => {
    client.getWatchData().then((data) => setWatchData(data));
  }, [setWatchData]);

  const getListenData = useCallback(() => {
    client.getListenData().then((data) => setListenData(data));
  }, [setListenData]);

  const onSearchQuery = useCallback(
    (query, experience) => {
      if (experience === "WATCH") {
        client.getWatchSearchResults(query).then((data) => {
          setWatchData(data);
          setSearchQuery(query);
        });
      } else if (experience === "LISTEN") {
        client.getListenSearchResults(query).then((data) => {
          setListenData(data);
          setSearchQuery(query);
        });
      }
    },
    [setSearchQuery, setWatchData, setListenData]
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
    watch: { data: watchData, fetch: getWatchData },
    listen: { data: listenData, fetch: getListenData },
    setSearchQuery: setSearchQuery,
    searchQuery: searchQuery,
    openOverlayID: openOverlayID,
    setOpenOverlayID: setOpenOverlayID,
    openOverlayCategory: openOverlayCategory,
    setOpenOverlayCategory: setOpenOverlayCategory,
  });
}
