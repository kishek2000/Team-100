import { useState, useEffect, useCallback } from "react";
import { Client } from "../client";
import { AUSTREAMS } from "../constants/index";

// Instantiate a single instance of the Client, used across
// the application for fetching of data.
const client = new Client("http://127.0.0.1:8000");

export function AppContainer({ children }) {
  const [mediaSelected, setMediaSelected] = useState("WATCH");
  const [watchData, setWatchData] = useState({});
  const [listenData, setListenData] = useState({});
  const [searchQuery, setSearchQuery] = useState({});
  const [serviceSelections, setServiceSelections] = useState({});
  const [serviceOptions, setServiceOptions] = useState(AUSTREAMS);
  const [region, setRegion] = useState("AU");
  const [openOverlayID, setOpenOverlayID] = useState(-1);
  const [overlayData, setOverlayData] = useState({});
  const [overlayServices, setOverlayServices] = useState({});
  const [overlayReview, setOverlayReview] = useState({});
  const [overlayEpisodeReviews, setOverlayEpisodeReviews] = useState({});
  const [listenYTLink, setListenYTLink] = useState({});
  const [listenCategoryData, setListenCategoryData] = useState({});
  const [selectedCat, setSelectedCat] = useState({
    value: "toplists",
    label: "Top Lists",
  });

  const getListenCatPlaylist = useCallback(
    (categoryID) => {
      client
        .getListenCatPlaylists(categoryID)
        .then((data) => setListenCategoryData(data));
    },
    [setListenCategoryData]
  );

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
    (tmdbID, mediaType) => {
      client.getWatchIMDBScore(tmdbID, mediaType).then((data) => {
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

  const getListenLink = useCallback(
    (spotifyID, listenType) => {
      client.getListenYoutube(spotifyID, listenType).then((data) => {
        setListenYTLink(data);
      });
    },
    [setListenYTLink]
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
    setOverlayReview: setOverlayReview,
    setOverlayEpisodeReviews: setOverlayEpisodeReviews,
    listenYTLink: listenYTLink,
    getListenLink: getListenLink,
    setListenYTLink: setListenYTLink,
    listenCategoryData: listenCategoryData,
    setListenCategoryData: setListenCategoryData,
    getListenCatPlaylist: getListenCatPlaylist,
    selectedCat: selectedCat,
    setSelectedCat: setSelectedCat,
  });
}
