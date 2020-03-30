'''
Starting to write some backend code to fulfill the search endpoint.
I know this shouldn't be here eventually but I didn't want to lose it in the mess of folders
Returns a list of media of all formats specified
'''
import requests
from definitions import TMDB_API_KEY, TMDB_URL, TMDB_BASE_IMG_URL

def tmdbToImdb(tmdbID, mediaType):
    '''Converts a tmdb id to an imdb id'''
    parameters = {
        "api_key": TMDB_API_KEY,
    }
    res = requests.get(TMDB_URL + "/" + mediaType + "/" + str(tmdbID) + "/external_ids", params=parameters)
    return res.json()["imdb_id"]

def craftPosterURL(path):
    '''Crafts a full url for a TMDB poster based on the path'''
    return TMDB_BASE_IMG_URL + "original" + path

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
            "imgURL": craftPosterURL(result["poster_path"])
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
            "type": "show",
            "id": tmdbToImdb(result["id"], "tv"),
            "imgURL": craftPosterURL(result["poster_path"])
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