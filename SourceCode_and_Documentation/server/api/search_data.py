'''
Starting to write some backend code to fulfill the search endpoint.
Returns a list of media of all formats specified
'''
import requests
from .definitions import TMDB_API_KEY, TMDB_URL, TMDB_BASE_IMG_URL
from .definitions import tmdbToImdb, genreIdsToString, craftPosterURL

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
                "first_air_date": result["first_air_date"][0:4]
            })
        elif result['media_type'] == 'movie':
            mediaObjects.append({
                "name": result["title"],
                "imgURL": craftPosterURL(result["poster_path"]),
                "overview": result["overview"],
                "first_air_date": result["release_date"][0:4]
            })
    return mediaObjects

def searchMusic(searchTerm, nItems):
    return []

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
    if "music" in formats:
        results['music'] = searchMusic(searchTerm, nItems)
    if "podcasts" in formats:
        results['podcasts'] = searchPodcasts(searchTerm, nItems)
    return results