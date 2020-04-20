import { useState, useEffect, useCallback } from "react";
import { Client } from "../client";

// Instantiate a single instance of the Client, used across
// the application for fetching of data.
const client = new Client("http://127.0.0.1:8000");

export function AppContainer({ children }) {
  const [mediaSelected, setMediaSelected] = useState("WATCH");
  const [watchData, setWatchData] = useState({});
  const [listenData, setListenData] = useState({});
  const [searchQuery, setSearchQuery] = useState({});
  const [serviceSelections, setServiceSelections] = useState({});
  const [serviceOptions, setServiceOptions] = useState({});
  const [region, setRegion] = useState("AU");
  const [openOverlayID, setOpenOverlayID] = useState(-1);
  const [overlayData, setOverlayData] = useState({});
  const [overlayServices, setOverlayServices] = useState({});
  const [overlayReview, setOverlayReview] = useState({});
  const [overlayEpisodeReviews, setOverlayEpisodeReviews] = useState({});

  const getWatchData = useCallback(() => {
    client.getWatchData().then((data) => setWatchData(data));
  }, [setWatchData]);

  const getListenData = useCallback(() => {
    client.getListenData().then((data) => setListenData(data));
  }, [setListenData]);

  const getOverlayServices = useCallback(
    (tmdbID, tmdbTitle, tmdbPopularity, tmdbScore) => {
      client
        .getWatchStreams(tmdbID, tmdbTitle, tmdbPopularity, tmdbScore)
        .then((data) => setOverlayServices(data));
    },
    [setOverlayServices]
  );

  const getServiceOptions = useCallback(
    (regionInput) => {
      client.getWatchRegionServices(regionInput).then((data) => {
        setServiceOptions(data);
      });
    },
    [setServiceOptions]
  );

  const onSearchQuery = useCallback(
    (query, experience, services) => {
      if (experience === "WATCH") {
        client.getWatchSearchResults(query, services).then((data) => {
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

  const getWatchScore = useCallback(
    (tmdbID) => {
      client.getWatchIMDBScore(tmdbID).then((data) => {
        setOverlayReview(data);
      });
    },
    [setOverlayReview]
  );

  const getTVEpScores = useCallback(
    (tmdbID) => {
      client.getTVEpisodeRatings(tmdbID).then((data) => {
        setOverlayEpisodeReviews(data);
      });
    },
    [setOverlayEpisodeReviews]
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
    getServiceOptions: getServiceOptions,
    watch: { data: watchData, fetch: getWatchData },
    listen: { data: listenData, fetch: getListenData },
    overlay: { data: overlayData },
    setOverlayData: setOverlayData,
    setSearchQuery: setSearchQuery,
    searchQuery: searchQuery,
    openOverlayID: openOverlayID,
    setOpenOverlayID: setOpenOverlayID,
    setServiceOptions: setServiceOptions,
    serviceOptions: serviceOptions,
    serviceSelections: serviceSelections,
    setServiceSelections: setServiceSelections,
    region: region,
    setRegion: setRegion,
    getOverlayServices: getOverlayServices,
    overlayServices: overlayServices,
    setOverlayServices: setOverlayServices,
    overlayReview: overlayReview,
    overlayEpisodeReviews: overlayEpisodeReviews,
    getWatchScore: getWatchScore,
    getTVEpScores: getTVEpScores,
  });
}
