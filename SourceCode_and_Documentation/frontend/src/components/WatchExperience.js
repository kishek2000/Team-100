import React, { useState, useEffect } from "react";
import { MediaCategoryList } from "./MediaCategoryList";
import { MediaGenreList } from "./MediaGenreList";
import { WATCH_GENRES } from "./constants";
import { GetWatchPath } from "./DataPaths";

// This function will give us the complete watch experience!
export function WatchExperience() {
  //Change data when promise resolves
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(GetWatchPath(), {
      method: 'GET'
    })
    .then(res => res.json())
    .then(
      (response) => {
        console.log(response);
        setIsLoaded(true);
        setItems(response);
      },
      (err) => {
        console.log(err)
        setIsLoaded(true);
        setError(err);
    })
  }, []);

  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    console.log("loading watchExperience")
    return <div>Loading...</div>;
  } else {
    
    return (
      <div className="watch-experience-lists">
        <MediaCategoryList
          category="Trending Daily"
          media="WATCH"
          mediaContent={items["Trending Daily"]}
        />
        <MediaCategoryList
          category="Top Rated TV Shows"
          media="WATCH"
          mediaContent={items["Top Rated TV Shows"]}
        />
        <MediaCategoryList
          category="Now Airing TV Shows"
          media="WATCH"
          mediaContent={items["Now Airing TV Shows"]}
        />
        <MediaCategoryList
          category="Top Rated Movies"
          media="WATCH"
          mediaContent={items["Top Rated Movies"]}
        />
        <MediaGenreList media="WATCH" genres={WATCH_GENRES} />
      </div>
    );
  }
  
}


