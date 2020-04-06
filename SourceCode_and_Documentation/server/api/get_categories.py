'''
A set of functions that will provide main page icons
E.G. I want to WATCH and I want to LISTEN  categories
'''

import requests
if __name__ == "__main__":
    from .definitions import TMDB_API_KEY, TMDB_URL, SPOTIFY_TOKEN
    from .definitions import genreIdsToString, craftPosterURL, findStreamingServices
else:
    from .definitions import TMDB_API_KEY, TMDB_URL, SPOTIFY_TOKEN
    from .definitions import genreIdsToString, craftPosterURL, findStreamingServices

def getWatchCategory(media, category, keyname):
    parameters = {
    "api_key": TMDB_API_KEY,
    }
    res = requests.get(TMDB_URL + media + category, params=parameters)
    json = res.json()["results"][0:8]
    mediaObjects = []
    for result in json:
        genreString = ""
        if media == '/tv/':
            mediaObjects.append({
                "name": result["name"],
                "imgURL": craftPosterURL(result["poster_path"]),
                "overview": result["overview"],
                "first_air_date": result["first_air_date"][0:4],
                "genres": genreIdsToString(result["genre_ids"], "tv"),
                "location": findStreamingServices(result["id"])
            })
        elif media == '/movie/':
            mediaObjects.append({
                "name": result["title"],
                "imgURL": craftPosterURL(result["poster_path"]),
                "overview": result["overview"],
                "first_air_date": result["release_date"][0:4],
                "genres": genreIdsToString(result["genre_ids"], "tv"),
                "location": findStreamingServices(result["id"])
            })
    return mediaObjects

def getWatchTrending():
    parameters = {
        "api_key": TMDB_API_KEY,
    }
    res = requests.get(TMDB_URL + "/trending/all/day", params=parameters)
    json = res.json()["results"][0:8]
    mediaObjects = []
    for result in json:
        if result['media_type'] == 'tv':
            mediaObjects.append({
                "name": result["name"],
                "imgURL": craftPosterURL(result["poster_path"]),
                "overview": result["overview"],
                "first_air_date": result["first_air_date"][0:4],
                "genres": genreIdsToString(result["genre_ids"], "tv"),
                "location": findStreamingServices(result["id"])
            })
        elif result['media_type'] == 'movie':
            mediaObjects.append({
                "name": result["title"],
                "imgURL": craftPosterURL(result["poster_path"]),
                "overview": result["overview"],
                "first_air_date": result["release_date"][0:4],
                "genres": genreIdsToString(result["genre_ids"], "movie"),
                "location": findStreamingServices(result["id"])
            })
    return mediaObjects

def newMusicReleases(nItems):
    header = {
        "Authorization": SPOTIFY_TOKEN
    }
    parameters = {
        "limit": nItems
    }
    res = requests.get("https://api.spotify.com/v1/browse/new-releases", headers=header, params=parameters)
    json = res.json()
    mediaObjects = []
    print(json)
    for result in json["albums"]["items"]:
        mediaObjects.append({
            "music_name": result["name"],
            "artist_name": result["artists"][0]["name"],
            "artist_link": result["artists"][0]["external_urls"]["spotify"],
            "type": result["type"].title(),
            "id": result["id"],
            "imgURL": result["images"][0]["url"],
            "music_link": result["external_urls"]["spotify"]
        })
    return mediaObjects