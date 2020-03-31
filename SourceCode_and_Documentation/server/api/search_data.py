'''
Starting to write some backend code to fulfill the search endpoint.
Returns a list of media of all formats specified
'''
import requests
from definitions import TMDB_API_KEY, TMDB_URL, TMDB_BASE_IMG_URL
from definitions import tmdbToImdb, genreIdsToString, craftPosterURL
from definitions import SPOTIFY_TOKEN

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
            "id": tmdbToImdb(result["id"], "movie"),
            "imgURL": craftPosterURL(result["poster_path"]),
            "genres": genreIdsToString(result["genre_ids"], "movie")
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
        genreString = ""
        mediaObjects.append({
            "name": result["name"],
            "type": "show",
            "id": tmdbToImdb(result["id"], "tv"),
            "imgURL": craftPosterURL(result["poster_path"]),
            "genres": genreIdsToString(result["genre_ids"], "tv")
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
            "genres": ", ".join(result["genres"])
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
        'shows': [],
        'music': [],
        'podcasts': []
    }
    if "movies" in formats:
        results['movies'] = searchFilms(searchTerm, nItems)
    if "shows" in formats:
        results['shows'] = searchShows(searchTerm, nItems)
    searchTerm.replace(" ", "%20OR%20")
    if "music" in formats:
        results['music'] = searchMusic(searchTerm, nItems)
    if "podcasts" in formats:
        results['podcasts'] = searchPodcasts(searchTerm, nItems)
    return results