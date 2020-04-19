'''
A set of functions that will provide main page icons
E.G. I want to WATCH and I want to LISTEN  categories

getWatchCategory(media, category, keyname, country="AU")
getWatchTrending()
newMusicReleases(nItems, country="AU")
featuredPlaylists(nItems, country="AU")
getTVData(id, region="AU, US")
getMovieData(id, region="AU, US")
getAlbumSingleData(id, media="album", country="AU")
getPodcastData(id, media="podcast", country="AU")
getTrackData(id, country="AU")
getListenLinks(url)
'''

import requests
import pprint

if __name__ == "__main__":
    from .definitions import TMDB_API_KEY, TMDB_URL, getSpotifyToken
    from .definitions import genreIdsToString, craftPosterURL
    from .definitions import getMovieContentRating, getTVContentRating, craftPlaylistDesc
    from .constants import getTVGenre, getMovieGenre
else:
    from .definitions import TMDB_API_KEY, TMDB_URL, getSpotifyToken
    from .definitions import genreIdsToString, craftPosterURL
    from .definitions import getMovieContentRating, getTVContentRating, craftPlaylistDesc
    from .constants import getTVGenre, getMovieGenre


def getWatchCategory(media, category, keyname, country="AU"):
    '''
    Based on media type and category name returns a list of media in that category
    '''
    parameters = {
        "api_key": TMDB_API_KEY,
    }
    if country != None:
        parameters["region"] = country
    res = requests.get(TMDB_URL + media + category, params=parameters)
    json = res.json()["results"]
    mediaObjects = []
    for result in json:
        if media == '/tv/':
            mediaObjects.append({
                "name": result["name"],
                "imgURL": craftPosterURL(result["poster_path"]),
                "first_air_date": result["first_air_date"][0:4],
                "id": result["id"],
                "score": round(result["vote_average"]/10, 2),
                "genre": getTVGenre(result["genre_ids"]),
                "lang": result["original_language"].upper(),
                "type": "tv",
            })
        elif media == '/movie/':
            mediaObjects.append({
                "name": result["title"],
                "imgURL": craftPosterURL(result["poster_path"]),
                "first_air_date": result["release_date"][0:4],
                "id": result["id"],
                "score": round(result["vote_average"]/10, 2),
                "genre": getMovieGenre(result["genre_ids"]),
                "lang": result["original_language"].upper(),
                "type": "movie"
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
    json = res.json()["results"]
    mediaObjects = []
    for result in json:
        if result['media_type'] == 'tv':
            mediaObjects.append({
                "name": result["name"],
                "imgURL": craftPosterURL(result["poster_path"]),
                "first_air_date": result["first_air_date"][0:4],
                "id": result["id"],
                "score": round(result["vote_average"]/10, 2),
                "genre": getTVGenre(result["genre_ids"]),
                "lang": result["original_language"].upper(),
                "type": "tv"
            })
        elif result['media_type'] == 'movie':
            mediaObjects.append({
                "name": result["title"],
                "imgURL": craftPosterURL(result["poster_path"]),
                "first_air_date": result["release_date"][0:4],
                # "content_rating": getMovieContentRating(result["id"]),
                "id": result["id"],
                "score": round(result["vote_average"]/10, 2),
                "genre": getMovieGenre(result["genre_ids"]),
                "lang": result["original_language"].upper(),
                "type": "movie"
            })
    return mediaObjects


def newMusicReleases(nItems, country="AU"):
    '''
    Returns Spotifys new music
    '''
    header = {
        "Authorization": getSpotifyToken()
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
            "listen_name": result["name"],
            "artist_name": result["artists"][0]["name"],
            "artist_link": result["artists"][0]["external_urls"]["spotify"],
            "type": result["album_type"].title(),
            "id": result["id"],
            "imgURL": result["images"][0]["url"],
            "listen_link": result["external_urls"]["spotify"]
        })
    return mediaObjects


def featuredPlaylists(nItems, country="AU"):
    header = {
        "Authorization": getSpotifyToken()
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

        mediaObjects.append({
            "listen_name": result["name"],
            "type": "Playlist",
            "description": craftPlaylistDesc(result["description"]),
            "id": result["id"],
            "imgURL": result["images"][0]["url"],
            "listen_link": result["external_urls"]["spotify"]
        })
    return mediaObjects


def getTVData(id, region="AU, US"):
    parameters = {
        "api_key": TMDB_API_KEY,
        "tv_id": id,
        "append_to_response": "videos,content_ratings"
    }
    res = requests.get(TMDB_URL + '/tv/' + '{}'.format(id), params=parameters)
    data = res.json()
    mediaObjects = []
    trailer_link = ""
    content_rating = ""
    genreString = ""

    if data["videos"]["results"]:
        for media in data["videos"]["results"]:
            if media["type"] == "Trailer":
                trailer_link = 'https://www.youtube.com/embed/{}'.format(
                    media["key"])

    for content_ratings in data["content_ratings"]["results"]:
        if content_ratings["iso_3166_1"] in region:
            content_rating = content_ratings["rating"]

    for genre in data["genres"]:
        genreString += genre["name"] + ", "

    mediaObjects.append({
        "name": data["name"],
        "imgURL": craftPosterURL(data["poster_path"]),
        "overview": data["overview"],
        "first_air_date": data["first_air_date"][0:4],
        "content_rating": content_rating,
        "genres": genreString[0:len(genreString)-2],
        "trailer": trailer_link,
        "lang": data["original_language"].upper()
        # "location": findStreamingServices(data["id"])
    })
    return mediaObjects


def getMovieData(id, region="AU, US"):
    parameters = {
        "api_key": TMDB_API_KEY,
        "movie_id": id,
        "append_to_response": "videos,releases"
    }
    res = requests.get(TMDB_URL + '/movie/' +
                       '{}'.format(id), params=parameters)
    data = res.json()
    mediaObjects = []
    trailer_link = ""
    content_rating = ""
    genreString = ""
    for media in data["videos"]["results"]:
        if media["type"] == "Trailer":
            trailer_link = 'https://www.youtube.com/embed/{}'.format(
                media["key"])

    for content_ratings in data["releases"]["countries"]:
        if content_ratings["iso_3166_1"] in region:
            content_rating = content_ratings["certification"]

    for genre in data["genres"]:
        genreString += genre["name"] + ", "

    mediaObjects.append({
        "name": data["title"],
        "imgURL": craftPosterURL(data["poster_path"]),
        "overview": data["overview"],
        "first_air_date": data["release_date"][0:4],
        "content_rating": content_rating,
        "genres": genreString[0:len(genreString)-2],
        "trailer": trailer_link,
        "lang": data["original_language"].upper()
    })
    return mediaObjects


def getAlbumSingleData(id, media="album", country="AU"):
    '''
    Returns album or single data for a specified id in Spotify
    '''
    header = {
        "Authorization": getSpotifyToken()
    }
    parameters = {
        "market": country
    }
    res = requests.get("https://api.spotify.com/v1/albums/{}".format(id),
                       headers=header, params=parameters)
    result = res.json()
    mediaObjects = []
    mediaObjects.append({
        "listen_name": result["name"],
        "listen_link": result["external_urls"]["spotify"],
        "artist_name": result["artists"][0]["name"],
        "artist_link": result["artists"][0]["external_urls"]["spotify"],
        "type": "album",
        "imgURL": result["images"][0]["url"],
        "label": result["label"],
        "total_tracks": result["total_tracks"],
        "copyright_statement": result["copyrights"][0]["text"],
        "release_date": result["release_date"][0:4],
        "youtube": getListenLinks(result["external_urls"]["spotify"])
    })
    return mediaObjects


def getPodcastData(id, media="podcast", country="AU"):
    '''
    Returns album or single data for a specified id in Spotify
    '''
    header = {
        "Authorization": getSpotifyToken()
    }
    parameters = {
        "market": country
    }
    res = requests.get("https://api.spotify.com/v1/shows/{}".format(id),
                       headers=header, params=parameters)
    result = res.json()
    mediaObjects = []
    mediaObjects.append({
        "listen_name": result["name"],
        "listen_link": result["external_urls"]["spotify"],
        "type": "podcast",
        "imgURL": result["images"][0]["url"],
        "label": result["publisher"],
        "description": result["description"],
        "youtube": getListenLinks(result["external_urls"]["spotify"])
    })
    return mediaObjects


def getPlaylistData(id, media="playlist", country="AU"):
    '''
    Returns album or single data for a specified id in Spotify
    '''
    header = {
        "Authorization": getSpotifyToken()
    }
    parameters = {
        "market": country,
        "fields": 'description,name,release_date,external_urls,images'
    }
    res = requests.get("https://api.spotify.com/v1/playlists/{}".format(id),
                       headers=header, params=parameters)
    result = res.json()
    mediaObjects = []
    mediaObjects.append({
        "listen_name": result["name"],
        "listen_link": result["external_urls"]["spotify"],
        "type": "playlist",
        "imgURL": result["images"][0]["url"],
        "description": craftPlaylistDesc(result["description"]),
        "youtube": getListenLinks(result["external_urls"]["spotify"])
    })
    return mediaObjects


def getTrackData(id, country="AU"):
    '''
    Returns track data for a specified id in Spotify
    '''
    header = {
        "Authorization": getSpotifyToken()
    }
    parameters = {
        "market": country
    }
    res = requests.get("https://api.spotify.com/v1/tracks/{}".format(id),
                       headers=header, params=parameters)
    result = res.json()
    mediaObjects = []
    mediaObjects.append({
        "listen_name": result["name"],
        "listen_link": result["external_urls"]["spotify"],
        "artist_name": result["artists"][0]["name"],
        "artist_link": result["artists"][0]["external_urls"]["spotify"],
        "type": "track",
        "imgURL": result["album"]["images"][0]["url"],
        "release_date": result["album"]["release_date"][0:4],
        "youtube": getListenLinks(result["external_urls"]["spotify"])
    })
    return mediaObjects


def getListenLinks(url):
    '''
    Returns links where you can listen to a given spotify url item
    '''
    parameters = {
        "url": url,
        "key": '555e94f4-c67d-41e3-9e9b-a8376d4766b4'
    }
    res = requests.get("https://api.song.link/v1-alpha.1/links",
                       params=parameters)
    # result = res.json()
    if 'linksByPlatform' in res.json() and 'youtube' in res.json()['linksByPlatform']:
        youtube = res.json()['linksByPlatform']['youtube']['url']
        if 'playlist' in youtube:
            url = youtube.partition('.com/')
            return url[0]+'.com/embed/' + url[2]
        else:
            url = youtube.partition('watch?v=')
            return url[0]+'embed/' + url[2]

    return ''
