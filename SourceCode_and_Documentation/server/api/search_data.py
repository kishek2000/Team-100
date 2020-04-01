'''
Starting to write some backend code to fulfill the search endpoint.
Returns a list of media of all formats specified
Must be in same folder as definitions.py
'''
import requests
from definitions import TMDB_API_KEY, TMDB_URL, TMDB_BASE_IMG_URL
from definitions import SPOTIFY_TOKEN
from definitions import genreIdsToString, craftPosterURL, findStreamingServices

def searchFilms(searchTerm, nItems):
    parameters = {
        "api_key": TMDB_API_KEY,
        "query": searchTerm
    }
    res = requests.get(TMDB_URL + "/search/movie", params=parameters)
    json = res.json()["results"][0:nItems]
    mediaObjects = []
    for result in json:
        mediaObjects.append({
            "name": result["title"],
            "type": "movie",
            "id": result["id"],
            "imgURL": craftPosterURL(result["poster_path"]),
            "genres": genreIdsToString(result["genre_ids"], "movie"),
            "location": findStreamingServices(result["id"])
        })
    return mediaObjects

def searchShows(searchTerm, nItems):
    parameters = {
        "api_key": TMDB_API_KEY,
        "query": searchTerm
    }
    res = requests.get(TMDB_URL + "/search/tv", params=parameters)
    json = res.json()["results"][0:nItems]
    mediaObjects = []
    for result in json:
        mediaObjects.append({
            "name": result["name"],
            "type": "tv",
            "id": result["id"],
            "imgURL": craftPosterURL(result["poster_path"]),
            "genres": genreIdsToString(result["genre_ids"], "tv"),
            "location": findStreamingServices(result["id"])
        })
    return mediaObjects

def getWatchCategory(media, category, keyname):
    parameters = {
    "api_key": TMDB_API_KEY,
    }
    res = requests.get(TMDB_URL + media + category, params=parameters)
    json = res.json()["results"][0:4]
    mediaObjects = []
    for result in json:
        genreString = ""
        if media == '/tv/':
            mediaObjects.append({
                "name": result["name"],
                "imgURL": craftPosterURL(result["poster_path"]),
                "overview": result["overview"],
                "first_air_date": result["first_air_date"][0:4],
                "genres": genreIdsToString(result["genre_ids"], "tv")
            })
        elif media == '/movie/':
            mediaObjects.append({
                "name": result["title"],
                "imgURL": craftPosterURL(result["poster_path"]),
                "overview": result["overview"],
                "first_air_date": result["release_date"][0:4],
                "genres": genreIdsToString(result["genre_ids"], "tv")
            })
    return mediaObjects

def getWatchTrending():
    parameters = {
        "api_key": TMDB_API_KEY,
    }
    res = requests.get(TMDB_URL + "/trending/all/day", params=parameters)
    json = res.json()["results"][0:4]
    mediaObjects = []
    for result in json:
        if result['media_type'] == 'tv':
            mediaObjects.append({
                "name": result["name"],
                "imgURL": craftPosterURL(result["poster_path"]),
                "overview": result["overview"],
                "first_air_date": result["first_air_date"][0:4],
                "genres": genreIdsToString(result["genre_ids"], "tv")
            })
        elif result['media_type'] == 'movie':
            mediaObjects.append({
                "name": result["title"],
                "imgURL": craftPosterURL(result["poster_path"]),
                "overview": result["overview"],
                "first_air_date": result["release_date"][0:4],
                "genres": genreIdsToString(result["genre_ids"], "movie")
            })
    return mediaObjects

def searchMusic(searchTerm, nItems):
    header = {
        "Authorization": SPOTIFY_TOKEN
    }
    parameters = {
        "q": searchTerm,
        "type": "artist",
        "limit": nItems
    }
    res = requests.get("https://api.spotify.com/v1/search", headers=header, params=parameters)
    json = res.json()
    mediaObjects = []
    for result in json["artists"]["items"]:
        mediaObjects.append({
            "name": result["name"],
            "type": "music_artist",
            "id": result["id"],
            "imgURL": result["images"][0]["url"],
            "genres": ", ".join(result["genres"]),
            "location": result["external_urls"]["spotify"]
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

def searchPodcasts(searchTerm, nItems):
    return []

def search(searchTerm, formats, nItems):
    '''
    Search for every category
    '''
    results = {
        'movies': [],
        'tv': [],
        'music': [],
        'podcasts': []
    }
    if "movies" in formats:
        results['movies'] = searchFilms(searchTerm, nItems)
    if "tv" in formats:
        results['tv'] = searchShows(searchTerm, nItems)
    searchTerm.replace(" ", "%20OR%20")
    if "music" in formats:
        results['music'] = searchMusic(searchTerm, nItems)
    if "podcasts" in formats:
        results['podcasts'] = searchPodcasts(searchTerm, nItems)
    return results