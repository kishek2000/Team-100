import React, { useState, useEffect} from "react";
import { MediaCategoryList } from "./MediaCategoryList";
import { MediaGenreList } from "./MediaGenreList";
import { LISTEN_GENRES } from "./constants";
import { GetListenPath } from "./DataPaths";

// This function will give us the complete Listen experience!
export function ListenExperience() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(GetListenPath())
    .then(res => res.json())
    .then(
      (response) => {
        setIsLoaded(true);
        setItems(response);
      },
      (err) => {
        setIsLoaded(true);
        setError(err);
    })
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="listen-experience-lists">
        <MediaCategoryList
          category="New Releases"
          media="LISTEN"
          mediaContent={items["New Releases"]}
        />
        <MediaCategoryList
          category="Top Rated Albums"
          media="LISTEN"
          // mediaContent={items}
        />
        <MediaCategoryList
          category="Top Rated Podcasts"
          media="LISTEN"
          // mediaContent={items}
        />
        <MediaGenreList media="LISTEN" genres={LISTEN_GENRES} />
      </div>
    );
  }
}

