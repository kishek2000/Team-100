var request = require("sync-request");

function GetWatchData() {
  return JSON.parse(
    request("GET", "http://localhost:8000/api/home/").getBody()
  )["watch_data"];
}

function GetListenData() {
  return JSON.parse(
    request("GET", "http://localhost:8000/api/home/").getBody()
  )["listen_data"];
}

export { GetWatchData, GetListenData };
