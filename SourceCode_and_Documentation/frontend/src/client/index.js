/*
  This file is our client class, where the requests to all our endpoints we have designed are declared as methods. A new client is declared each time the app is rendered and new useState hooks are declared.
*/

export class Client {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async api(endpoint) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw Error(response.text);
    } else {
      return await response.json();
    }
  }

  async getWatchData() {
    const data = await this.api("/api/home/watch");
    return data;
  }

  async getListenData() {
    const data = await this.api("/api/home/listen");
    return data;
  }

  async getFilteredWatchData(movieGenres, tvGenres, watchCategory) {
    if (movieGenres === undefined) {
      movieGenres = "";
    }
    if (tvGenres === undefined) {
      tvGenres = "";
    }
    if (String(movieGenres).length === 0 && String(tvGenres).length > 0) {
      const data = await this.api(
        `/api/home/watch/filtered/none/${tvGenres}/${watchCategory}`
      );
      return data;
    } else if (
      String(tvGenres).length === 0 &&
      String(movieGenres).length > 0
    ) {
      const data = await this.api(
        `/api/home/watch/filtered/${movieGenres}/none/${watchCategory}`
      );
      return data;
    } else {
      const data = await this.api(
        `/api/home/watch/filtered/${movieGenres}/${tvGenres}/${watchCategory}`
      );
      return data;
    }
  }

  async getWatchSearchResults(query, services) {
    if (services === undefined || Object.keys(services).length === 0) {
      const data = await this.api(`/api/search/watch/unfiltered/${query}`);
      return data;
    } else {
      const data = await this.api(
        `/api/search/watch/filtered/${query}/${services}`
      );
      return data;
    }
  }

  async getWatchRegionServices(region) {
    const data = await this.api(`/api/search/watch/filters/${region}`);
    return data.list;
  }

  async getListenSearchResults(query) {
    const data = await this.api(`/api/search/listen/${query}`);
    return data;
  }

  async getMediaOverlayData(mediaId, mediaType) {
    const data = await this.api(
      `/api/details/${mediaType.toLowerCase()}/${mediaId}`
    );
    return data.data;
  }

  async getWatchIMDBScore(tmdbID, mediaType) {
    const data = await this.api(`/api/reviews/title/${tmdbID}/${mediaType}`);
    return data.rating;
  }

  async getTVEpisodeRatings(tmdbID) {
    const data = await this.api(`/api/reviews/episodes/${tmdbID}`);
    return data.episodes;
  }

  async getWatchStreams(tmdbID, tmdbTitle, releaseYear, mediaType) {
    const data = await this.api(
      `/api/services/tv/${tmdbID}/${tmdbTitle}/${releaseYear}/${mediaType}`
    );
    return data.data;
  }

  async getListenYoutube(spotifyID, type) {
    const data = await this.api(`/api/services/listen/${spotifyID}/${type}`);
    return data.data;
  }

  async getListenCatPlaylists(categoryId) {
    const data = await this.api(`/api/details/listen/category/${categoryId}`);
    return data.data;
  }
}
