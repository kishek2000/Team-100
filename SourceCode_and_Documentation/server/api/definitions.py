'''
A set of function and constant definitions common between several files,
mainly search_data and get_categories.
Also responsible for generating the TMDB image URL and spotify token
File contains sensitive data (API keys, Spotify Client Secret) which aren't really protected

clientSpotifyAuthorise()
getSpotifyToken()
findServices(tmdb_id, tmdb_title, date, media_type, region='AU')
getTVContentRating(mediaID, region="AU, US")
getMovieContentRating(mediaID, region="AU, US")
genreIdsToString(genreIDs, mediaType)
craftPosterURL(path)
craftAlbumURL(images)
tmdbToImdb(tmdbID, mediaType) (Deprecated)
getSpotifyCopyright(id, type, region='AU')
'''

import requests
import threading
from justwatch import JustWatch
TMDB_API_KEY = "6a347f3f994cdb8434d8698152dc44a8"
TMDB_URL = "https://api.themoviedb.org/3"
SPOTIFY_AUTHORISATION = 'Basic ZjkyZTBhMzA5OTZjNGMxZTg3MGM1YjJjZmUyZTU4YzA6MmQyY2U5OGY5YjQxNDQzOWI3NTc1ZmMzYzQ3M2M0MzU='

# Find the img URL used by TMDB
parameters = {
    "api_key": TMDB_API_KEY,
}
config = requests.get(TMDB_URL + "/configuration", params=parameters)
TMDB_BASE_IMG_URL = config.json()["images"]["secure_base_url"]


def clientSpotifyAuthorise():
    '''
    Create and refresh spotify Token (Client-Client Authorization only)
    '''
    global spotifyToken
    headers = {
        'Authorization': SPOTIFY_AUTHORISATION,
    }
    data = {
        'grant_type': 'client_credentials'
    }
    RESPONSE = requests.post(
        'https://accounts.spotify.com/api/token', headers=headers, data=data)
    spotifyToken = RESPONSE.json()["token_type"] + \
        " " + RESPONSE.json()["access_token"]
    refreshTimer = threading.Timer(
        RESPONSE.json()["expires_in"], clientSpotifyAuthorise)
    refreshTimer.start()


spotifyToken = ""
clientSpotifyAuthorise()


def getSpotifyToken():
    return spotifyToken


def findServices(tmdb_id, tmdb_title, date, media_type, region='AU'):
    '''
    Returns a list of streaming services and links to relevant pages
    '''
    just_watch = JustWatch()
    results = just_watch.search_for_item(query=tmdb_title)
    # Ideally this will go into its own storage so we don't have to keep calling it
    # it still ends up being pretty quick though
    # We set up a list of providers (Netflix etc.) we can refer to later
    prov = just_watch.get_providers()
    providers = {}
    for result in prov:
        providers[result["id"]] = {
            "name": result["clear_name"],
            "logo": "images.justwatch.com" + result["icon_url"][:-9] + "s100"
        }
    services = []
    for item in results['items']:
        import pprint
        if 'scoring' in item:
            for prov in item['scoring']:
                if (prov['provider_type'] == 'tmdb:id' and prov['value'] == tmdb_id) or item['title'] == tmdb_title:
                    if 'offers' in item:
                        for service in item['offers']:
                            if service['monetization_type'] != 'cinema' and (str(item["original_release_year"] + 1) == date or str(item["original_release_year"] - 1) == date or str(item["original_release_year"]) == date):
                                offer = {
                                    "name": providers[service["provider_id"]]["name"],
                                    "link": service["urls"]["standard_web"],
                                    "logo": providers[service["provider_id"]]["logo"],
                                    "price": ""
                                }
                                # Not all items have a "retail_price" field
                                if "retail_price" in service:
                                    offer["price"] = str(
                                        service["retail_price"]) + ' ' + service["currency"]
                                add = True
                                for selections in services:
                                    if selections["link"] == offer["link"] or selections["name"] == offer["name"]:
                                        add = False
                                if add:
                                    services.append(offer)
    if len(services) == 0:
        services = ["empty"]
    return services


def getTVContentRating(mediaID, region="AU, US"):
    '''
    Returns the content rating for a particular region, for a given watch id
    '''
    parameters = {
        "api_key": TMDB_API_KEY,
        "tv_id": mediaID
    }
    res = requests.get(TMDB_URL + "/tv/" + "{}".format(mediaID) +
                       "/content_ratings", params=parameters)
    for content_ratings in res.json()["results"]:
        if content_ratings["iso_3166_1"] in region:
            return content_ratings["rating"]


def getMovieContentRating(mediaID, region="AU, US"):
    '''
    Returns the content rating for a particular region, for a given watch id
    '''
    parameters = {
        "api_key": TMDB_API_KEY,
        "movie_id": mediaID
    }
    res = requests.get(TMDB_URL + "/movie/" + "{}".format(mediaID) +
                       "/release_dates", params=parameters)
    for content_ratings in res.json()["results"]:
        if content_ratings["iso_3166_1"] in region:
            return content_ratings["release_dates"][0]["certification"]


def genreIdsToString(genreIDs, mediaType):
    '''
    Turns tmdb genre ids into the names of those genres as a single string
    '''
    parameters = {
        "api_key": TMDB_API_KEY,
    }
    res = requests.get(TMDB_URL + "/genre/" + mediaType +
                       "/list", params=parameters)
    genreString = ""
    for genre in res.json()["genres"]:
        if genre["id"] in genreIDs:
            genreString += genre["name"] + ", "
    if genreString != "":
        genreString = genreString[:-2]
    return genreString


def craftPosterURL(path):
    '''
    Crafts a full url for a TMDB poster based on the path
    '''
    if path is None:
        return None
    return TMDB_BASE_IMG_URL + "w500" + path


def craftAlbumURL(images):
    '''
    Crafts a full url for a spotify album cover based on the images list
    '''
    if images == []:
        return "No Image"
    else:
        return images[0]["url"]


def tmdbToImdb(tmdbID, mediaType=None):
    '''
    Converts a TMDB ID to an IMDB ID
    '''
    parameters = {
        "api_key": TMDB_API_KEY,
    }

    res = requests.get(TMDB_URL + "/" + mediaType + "/" +
                       str(tmdbID) + "/external_ids", params=parameters)
    return res.json()["imdb_id"]


def craftPlaylistDesc(string):
    final_desc = ""
    if 'Cover' not in string and '<a' in string:
        final_desc = string.partition('>')[2].partition(
            '<')[0] + string.partition('>')[2].partition('>')[2]
    elif 'Cover' in string and '<a' in string:
        final = string.partition('<')[0]+string.partition('>')[2].partition(
            '<')[0] + string.partition('>')[2].partition('>')[2]
        if 'Cover' in final:
            final_desc = final.partition('Cover')[0]
    else:
        final_desc = string.partition('Cover:')[0]
    return final_desc


def getSpotifyCopyright(id, type, region='AU'):
    '''
    Returns spotify copyright information for an album or show
    type MUST be "albums" or "shows"
    '''
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': getSpotifyToken(),
    }
    params = (
        ('market', region),
    )
    response = requests.get('https://api.spotify.com/v1/' +
                            type + '/' + id, headers=headers, params=params)
    return response.json()["copyrights"]


tv_genres = [
    {
        "id": 10759,
        "name": "Action & Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 10762,
        "name": "Kids"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10763,
        "name": "News"
    },
    {
        "id": 10764,
        "name": "Reality"
    },
    {
        "id": 10765,
        "name": "Sci-Fi & Fantasy"
    },
    {
        "id": 10766,
        "name": "Soap"
    },
    {
        "id": 10767,
        "name": "Talk"
    },
    {
        "id": 10768,
        "name": "War & Politics"
    },
    {
        "id": 37,
        "name": "Western"
    }
]

movie_genres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]


def getTVGenre(ids):
    genres = []
    for num in ids:
        for item in tv_genres:
            if item["id"] == num:
                if len(", ".join(genres)) + len(item["name"]) >= 20:
                    return ", ".join(genres)
                genres.append(item["name"])
    return ", ".join(genres)


def getMovieGenre(ids):
    genres = []
    for num in ids:
        for item in movie_genres:
            if item["id"] == num:
                if len(", ".join(genres)) + len(item["name"]) >= 20:
                    return ", ".join(genres)
                genres.append(item["name"])
    return ", ".join(genres)
