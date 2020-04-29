'''
A set of functions that combine to produce searchbar functionality
Returns a list of media in all formats specified (movies, tv, music, podcasts)

searchFilms(searchTerm, nItems, country)
searchShows(searchTerm, nItems, country)
spotifySearch(searchTerm, nItems, country, types)
search(searchTerm, formats, nItems, country="AU")
getTmdbId(name, media)
filtered_search(filter_dict)
'''
import requests
if __name__ == "__main__":
    from .definitions import TMDB_API_KEY, TMDB_URL, getSpotifyToken
    from .definitions import genreIdsToString, craftPosterURL, craftAlbumURL
    from .definitions import getMovieGenre, getTVGenre
    from urllib.parse import quote
    import json
else:
    from .definitions import TMDB_API_KEY, TMDB_URL, getSpotifyToken
    from .definitions import genreIdsToString, craftPosterURL, craftAlbumURL
    from .definitions import getMovieGenre, getTVGenre
    from urllib.parse import quote
    import json


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
        img = craftPosterURL(result["poster_path"])
        mediaObjects.append({
            "name": result["title"],
            "type": "movie",
            "imgURL": img if img else "https://ik.imagekit.io/penchantcain/Image_Not_Found_fyfU56Re4.png",
            "score": round(result["vote_average"]/10, 2),
            "genre": getMovieGenre(result["genre_ids"]),
            "first_air_date": result["release_date"][0:4] if 'release_date' in result else '',
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
        img = craftPosterURL(result["poster_path"])
        mediaObjects.append({
            "name": result["name"],
            "type": "tv",
            "imgURL": img if img else "https://ik.imagekit.io/penchantcain/Image_Not_Found_fyfU56Re4.png",
            "genre": getTVGenre(result["genre_ids"]),
            "score": round(result["vote_average"]/10, 2),
            "first_air_date": result["first_air_date"][0:4] if "first_air_date" in result else '',
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
        "Authorization": getSpotifyToken()
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
                "listen_name": result["name"],
                "artist_name": result["artists"][0]["name"],
                "artist_link": result["artists"][0]["external_urls"]["spotify"],
                "type": result["album_type"].title(),
                "id": result["id"],
                "imgURL": craftAlbumURL(result["images"]),
                "listen_link": result["external_urls"]["spotify"]
            })
    if "tracks" in json:
        for result in json["tracks"]["items"]:
            if result is None:
                break
            mediaObjects["music"]["Track Results"].append({
                "listen_name": result["name"],
                "artist_name": result["artists"][0]["name"],
                "artist_link": result["artists"][0]["external_urls"]["spotify"],
                "type": result["type"].title(),
                "id": result["id"],
                "imgURL": craftAlbumURL(result["album"]["images"]),
                "listen_link": result["external_urls"]["spotify"]
            })
    # Extracts podcasts (called shows in Spotify)
    if "shows" in json:
        for result in json["shows"]["items"]:
            if result is None:
                break
            mediaObjects["podcasts"]["Podcast Results"].append({
                "listen_name": result["name"],
                "description": result["description"],
                "type": result["type"].title(),
                "id": result["id"],
                "imgURL": craftAlbumURL(result["images"]),
                "listen_link": result["external_urls"]["spotify"]
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

    searchTerm = str(searchTerm).replace("%20", " ")
    if "movies" in formats:
        results['movies'] = searchFilms(searchTerm, nItems, country)
    if "tv" in formats:
        results['tv'] = searchShows(searchTerm, nItems, country)

    types = ""
    if "music" in formats:
        types += "album,track,"
    if "podcasts" in formats:
        types += "show,"
    if types != "":
        types = types[:-1]  # Need this line - excess commas break spotify
        spotifyObjects = spotifySearch(searchTerm, nItems, country, types)
        results["music"] = spotifyObjects["music"]
        results["podcasts"] = spotifyObjects["podcasts"]
    return results


def getTmdbId(name, media):
    '''
    Gets the tmdb id for a given movie/tv shows
    '''
    parameters = {
        "api_key": TMDB_API_KEY,
        "query": name
    }
    res = requests.get(
        TMDB_URL + "/search/{}".format(media), params=parameters)
    json = res.json()["results"]
    for result in json:
        if 'name' in result and result['name'] == name:
            return result["id"]


def filtered_search(filter_dict):
    '''
    Request to justwatch api for filtered search
    '''
    res = requests.get('https://apis.justwatch.com/content/titles/en_AU/popular?body={}'.format(
        quote(json.dumps(filter_dict, separators=(',', ':')))))
    mediaObjects = {
        "TV Results": [],
        "Movie Results": []
    }
    for item in res.json()["items"]:
        score = 0
        tmdbid = 0
        if 'scoring' in item:
            for scores in item["scoring"]:
                if scores["provider_type"] == "tmdb:id":
                    tmdbid = scores["value"]
                if scores["provider_type"] == "imdb:score":
                    score = scores["value"]
        if item["object_type"] == "show":
            mediaObjects["TV Results"].append({
                "name": item["title"],
                "id": tmdbid if tmdbid != 0 else getTmdbId(item["title"], 'tv'),
                "first_air_date": item["original_release_year"],
                "type": "tv",
                "imgURL": "https://images.justwatch.com" + item["poster"].partition('profile')[0][0:-2] + '/s718',
                "score": round(score / 10, 2),
            })
        else:
            mediaObjects["Movie Results"].append({
                "name": item["title"],
                "id": tmdbid if tmdbid != 0 else getTmdbId(item["title"], 'movie'),
                "first_air_date": item["original_release_year"],
                "type": item["object_type"],
                "imgURL": "https://images.justwatch.com" + item["poster"].partition('profile')[0][0:-2] + '/s718',
                "score": round(score / 10, 2),
            })
    return mediaObjects
