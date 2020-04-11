'''
A set of functions that combine to produce searchbar functionality
Returns a list of media in all formats specified (movies, tv, music, podcasts)

searchFilms(searchTerm, nItems, country)
searchShows(searchTerm, nItems, country)
spotifySearch(searchTerm, nItems, country, types)
search(searchTerm, formats, nItems, country="AU")
'''
import requests
if __name__ == "__main__":
    from .definitions import TMDB_API_KEY, TMDB_URL, SPOTIFY_TOKEN
    from .definitions import genreIdsToString, craftPosterURL, findStreamingServices, craftAlbumURL
else:
    from .definitions import TMDB_API_KEY, TMDB_URL, SPOTIFY_TOKEN
    from .definitions import genreIdsToString, craftPosterURL, findStreamingServices, craftAlbumURL


def searchFilms(searchTerm, nItems, country):
    '''
    Keyword search for movies (through tmdb)
    '''
    parameters = {
        "api_key": TMDB_API_KEY,
        "query": searchTerm,
        "region": country
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
            # "location": findStreamingServices(result["id"]),
            "overview": result["overview"],
            "first_air_date": result["release_date"][0:4],
            "id": result["id"]
        })
    return mediaObjects


def searchShows(searchTerm, nItems, country):
    '''
    Keyword search for TV shows (through tmdb)
    '''
    parameters = {
        "api_key": TMDB_API_KEY,
        "query": searchTerm,
        "region": country,
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
            # "location": findStreamingServices(result["id"]),
            "overview": result["overview"],
            "first_air_date": result["first_air_date"][0:4],
            "id": result["id"]
        })
    return mediaObjects


def spotifySearch(searchTerm, nItems, country, types):
    '''
    Keyword search through Spotify's API (in a single call)
    currently types can include tracks, albums and shows (podcasts)
    in a comma separated string
    '''
    header = {
        "Authorization": SPOTIFY_TOKEN
    }
    parameters = {
        "q": searchTerm,
        "type": types,
        "limit": nItems,
        "market": country
    }
    res = requests.get("https://api.spotify.com/v1/search",
                       headers=header, params=parameters)
    json = res.json()
    mediaObjects = {
        "music": {
            "Album Results": [],
            "Track Results": []
        },
        "podcasts": {
            "Podcast Results": []
        }
    }
    # Extracts albums from results
    if "albums" in json:
        for result in json["albums"]["items"]:
            if result is None:
                break
            mediaObjects["music"]["Album Results"].append({
                "music_name": result["name"],
                "artist_name": result["artists"][0]["name"],
                "artist_link": result["artists"][0]["external_urls"]["spotify"],
                "type": result["album_type"].title(),
                "id": result["id"],
                "imgURL": craftAlbumURL(result["images"]),
                "music_link": result["external_urls"]["spotify"]
            })
    if "tracks" in json:
        for result in json["tracks"]["items"]:
            if result is None:
                break
            mediaObjects["music"]["Track Results"].append({
                "music_name": result["name"],
                "artist_name": result["artists"][0]["name"],
                "artist_link": result["artists"][0]["external_urls"]["spotify"],
                "type": result["type"].title(),
                "id": result["id"],
                "imgURL": craftAlbumURL(result["album"]["images"]),
                "music_link": result["external_urls"]["spotify"]
            })
    # Extracts podcasts (called shows in Spotify)
    if "shows" in json:
        for result in json["shows"]["items"]:
            if result is None:
                break
            mediaObjects["podcasts"]["Podcast Results"].append({
                "show_name": result["name"],
                "description": result["description"],
                "type": result["type"].title(),
                "id": result["id"],
                "imgURL": craftAlbumURL(result["images"]),
                "show_link": result["external_urls"]["spotify"]
            })
    return mediaObjects


def search(searchTerm, formats, nItems, country="AU"):
    '''
    Main search function. Currently returns the format seen in results below
    '''
    results = {
        'movies': [],
        'tv': [],
        'music': {
            "Album Results": [],
            "Track Results": []
        },
        'podcasts': []
    }

    str(searchTerm).replace("%20", " ")
    if "movies" in formats:
        results['movies'] = searchFilms(searchTerm, nItems, country)
    if "tv" in formats:
        results['tv'] = searchShows(searchTerm, nItems, country)

    searchTerm.replace(" ", "%20OR%20")
    types = ""
    if "music" in formats:
        types += "album,track,"
    if "podcasts" in formats:
        types += "show"
    if types != "":
        # types = types[:-1]
        spotifyObjects = spotifySearch(searchTerm, nItems, country, types)
        results["music"] = spotifyObjects["music"]
        results["podcasts"] = spotifyObjects["podcasts"]
    return results
