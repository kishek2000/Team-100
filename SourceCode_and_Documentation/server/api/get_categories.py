'''
A set of functions that will provide main page icons
E.G. I want to WATCH and I want to LISTEN  categories

getWatchCategory(media, category, keyname, country="AU")
getWatchTrending()
newMusicReleases(nItems, country="AU")
'''

import requests
if __name__ == "__main__":
    from .definitions import TMDB_API_KEY, TMDB_URL, SPOTIFY_TOKEN
    from .definitions import genreIdsToString, craftPosterURL
else:
    from .definitions import TMDB_API_KEY, TMDB_URL, SPOTIFY_TOKEN
    from .definitions import genreIdsToString, craftPosterURL


def getWatchCategory(media, category, keyname, country="AU"):
    '''
    Based on media type and category name returns a list of media in that category
    '''
    parameters = {
        "api_key": TMDB_API_KEY,
        "region": country
    }
    res = requests.get(TMDB_URL + media + category, params=parameters)
    json = res.json()["results"][0:8]
    mediaObjects = []
    for result in json:
        if media == '/tv/':
            mediaObjects.append({
                "name": result["name"],
                "imgURL": craftPosterURL(result["poster_path"]),
                "overview": result["overview"],
                "first_air_date": result["first_air_date"][0:4],
                "genres": genreIdsToString(result["genre_ids"], "tv"),
                "id": result["id"]
                # "location": findStreamingServices(result["id"])
            })
        elif media == '/movie/':
            mediaObjects.append({
                "name": result["title"],
                "imgURL": craftPosterURL(result["poster_path"]),
                "overview": result["overview"],
                "first_air_date": result["release_date"][0:4],
                "genres": genreIdsToString(result["genre_ids"], "tv"),
                "id": result["id"]
                # "location": findStreamingServices(result["id"])
            })
    return mediaObjects


def getWatchTrending():
    '''
    Gets all the trending movies/tv shows for the day
    '''
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
                "id": result["id"]
                # "location": findStreamingServices(result["id"])
            })
        elif result['media_type'] == 'movie':
            mediaObjects.append({
                "name": result["title"],
                "imgURL": craftPosterURL(result["poster_path"]),
                "overview": result["overview"],
                "first_air_date": result["release_date"][0:4],
                "genres": genreIdsToString(result["genre_ids"], "movie"),
                "id": result["id"]
                # "location": findStreamingServices(result["id"])
            })
    return mediaObjects


def newMusicReleases(nItems, country="AU"):
    '''
    Returns Spotifys new music
    '''
    header = {
        "Authorization": SPOTIFY_TOKEN
    }
    parameters = {
        "limit": nItems,
        "market": country
    }
    res = requests.get("https://api.spotify.com/v1/browse/new-releases",
                       headers=header, params=parameters)
    json = res.json()
    mediaObjects = []
    for result in json["albums"]["items"]:
        mediaObjects.append({
            "music_name": result["name"],
            "artist_name": result["artists"][0]["name"],
            "artist_link": result["artists"][0]["external_urls"]["spotify"],
            "type": result["album_type"].title(),
            "id": result["id"],
            "imgURL": result["images"][0]["url"],
            "music_link": result["external_urls"]["spotify"]
        })
    return mediaObjects


def featuredPlaylists(nItems, country="AU"):
    header = {
        "Authorization": SPOTIFY_TOKEN
    }
    parameters = {
        "limit": nItems,
        "market": country
    }
    res = requests.get("https://api.spotify.com/v1/browse/featured-playlists",
                       headers=header, params=parameters)
    json = res.json()
    mediaObjects = []
    for result in json["playlists"]["items"]:
        if 'Cover' not in result["description"] and '<a' in result["description"]:
            final = result["description"].partition('>')[2].partition(
                '<')[0] + result["description"].partition('>')[2].partition('>')[2]
        else:
            print(result["description"])
            final = result["description"].partition('Cover:')[0]
        mediaObjects.append({
            "show_name": result["name"],
            "type": "Playlist",
            "description": final,
            "id": result["id"],
            "imgURL": result["images"][0]["url"],
            "show_link": result["external_urls"]["spotify"]
        })
    return mediaObjects
