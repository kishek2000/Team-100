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

  async getWatchSearchResults(query) {
    const data = await this.api(`/api/search/watch/${query}`);
    return data;
  }

  async getListenSearchResults(query) {
    const data = await this.api(`/api/search/listen/${query}`);
    return data;
  }
}
