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

  async getWatchSearchResults(query, services) {
    if (Object.keys(services).length === 0) {
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

  async getWatchStreams(tmdbID, tmdbTitle, tmdbPopularity, tmdbScore) {
    const data = await this.api(
      `/api/services/tv/${tmdbID}/${tmdbTitle}/${tmdbPopularity}/${tmdbScore}`
    );
    return data.data;
  }
}
