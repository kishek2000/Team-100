'''
A set of functions that combine to produce searchbar functionality
Returns a list of media in all formats specified
'''
import requests
if __name__ == "__main__":
    from .definitions import TMDB_API_KEY, TMDB_URL, SPOTIFY_TOKEN
    from .definitions import genreIdsToString, craftPosterURL, findStreamingServices, craftAlbumURL
else:
    from .definitions import TMDB_API_KEY, TMDB_URL, SPOTIFY_TOKEN
    from .definitions import genreIdsToString, craftPosterURL, findStreamingServices, craftAlbumURL


def searchFilms(searchTerm, nItems):
    parameters = {
        "api_key": TMDB_API_KEY,
        "query": searchTerm
    }
    res = requests.get(TMDB_URL + "/search/movie", params=parameters)
    json = res.json()["results"][0:nItems]
    mediaObjects = []
    for result in json:
        if result is None:
            break
        mediaObjects.append({
            "name": result["title"],
            "type": "movie",
            "imgURL": craftPosterURL(result["poster_path"]),
            "genres": genreIdsToString(result["genre_ids"], "movie"),
            "location": findStreamingServices(result["id"]),
            "overview": result["overview"],
            "first_air_date": result["release_date"][0:4]
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
        if result is None:
            break
        mediaObjects.append({
            "name": result["name"],
            "type": "tv",
            "imgURL": craftPosterURL(result["poster_path"]),
            "genres": genreIdsToString(result["genre_ids"], "tv"),
            "location": findStreamingServices(result["id"]),
            "overview": result["overview"],
            "first_air_date": result["first_air_date"][0:4]
        })
    return mediaObjects


def searchTracks(searchTerm, nItems):
    header = {
        "Authorization": SPOTIFY_TOKEN
    }
    parameters = {
        "q": searchTerm,
        "type": "track",
        "limit": nItems
    }
    res = requests.get("https://api.spotify.com/v1/search",
                       headers=header, params=parameters)
    json = res.json()
    mediaObjects = []
    for result in json["tracks"]["items"]:
        if result is None:
            break
        mediaObjects.append({
            "music_name": result["name"],
            "artist_name": result["artists"][0]["name"],
            "artist_link": result["artists"][0]["external_urls"]["spotify"],
            "type": result["type"].title(),
            "id": result["id"],
            "imgURL": craftAlbumURL(result["album"]["images"]),
            "music_link": result["external_urls"]["spotify"]
        })
    return mediaObjects


def searchAlbums(searchTerm, nItems):
    header = {
        "Authorization": SPOTIFY_TOKEN
    }
    parameters = {
        "q": searchTerm,
        "type": "album",
        "limit": nItems
    }
    res = requests.get("https://api.spotify.com/v1/search",
                       headers=header, params=parameters)
    json = res.json()
    mediaObjects = []
    for result in json["albums"]["items"]:
        if result is None:
            break
        mediaObjects.append({
            "music_name": result["name"],
            "artist_name": result["artists"][0]["name"],
            "artist_link": result["artists"][0]["external_urls"]["spotify"],
            "type": result["type"].title(),
            "id": result["id"],
            "imgURL": craftAlbumURL(result["images"]),
            "music_link": result["external_urls"]["spotify"]
        })
    return mediaObjects


def searchPodcasts(searchTerm, nItems):
    header = {
        "Authorization": SPOTIFY_TOKEN
    }
    parameters = {
        "q": searchTerm,
        "type": "album,show",
        "limit": nItems
    }
    res = requests.get("https://api.spotify.com/v1/search",
                       headers=header, params=parameters)
    json = res.json()
    print("------------------------------------------")
    print(json)
    print("------------------------------------------")
    mediaObjects = []
    for result in json["shows"]["items"]:
        if result is None:
            break
        mediaObjects.append({
            "show_name": result["name"],
            "description": result["description"],
            "type": result["type"].title(),
            "id": result["id"],
            "imgURL": craftAlbumURL(result["images"]),
            "show_link": result["external_urls"]["spotify"]
        })
    return mediaObjects


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
    str(searchTerm).replace("%20", " ")
    if "movies" in formats:
        results['movies'] = searchFilms(searchTerm, nItems)
    if "tv" in formats:
        results['tv'] = searchShows(searchTerm, nItems)
    searchTerm.replace(" ", "%20OR%20")
    if "music" in formats:
        results['music'] = {"Track Results": searchTracks(
            searchTerm, nItems), "Album Results": searchAlbums(searchTerm, nItems)}
    if "podcasts" in formats:
        results['podcasts'] = {
            "Podcast Results": searchPodcasts(searchTerm, nItems)}

    return results
