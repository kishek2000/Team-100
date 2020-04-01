'''
A set of functions that combine to produce searchbar functionality
Returns a list of media in all formats specified
'''
import requests
if __name__ == "__main__":
    from definitions import TMDB_API_KEY, TMDB_URL, SPOTIFY_TOKEN
    from definitions import genreIdsToString, craftPosterURL, findStreamingServices
else:
    from .definitions import TMDB_API_KEY, TMDB_URL, SPOTIFY_TOKEN
    from .definitions import genreIdsToString, craftPosterURL, findStreamingServices

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