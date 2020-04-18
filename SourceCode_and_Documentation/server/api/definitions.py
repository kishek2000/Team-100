'''
A set of function and constant definitions common between several files,
mainly search_data and get_categories.
Also responsible for generating the TMDB image URL and spotify token
File contains sensitive data (API keys, Spotify Client Secret) which aren't really protected

findStreamingServices(id) (DEFUNCT)
genreIdsToString(genreIDs, mediaType)
craftPosterURL(path)
craftAlbumURL(images)
tmdbToImdb(tmdbID, mediaType) (Deprecated)
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

def findServices(tmdb_id, tmdb_title, region='AU'):
    just_watch = JustWatch(region)
    results = just_watch.search_for_item(query=tmdb_title)
    # Ideally this will go into its own storage so we don't have to keep calling it
    prov = just_watch.get_providers()
    providers = {}
    for result in prov:
        providers[result["id"]] = result["clear_name"]
    services = []
    for item in results['items']:
        for prov in item['scoring']:
                if prov['provider_type'] == 'tmdb:id' and prov['value'] == tmdb_id:
                    for service in item['offers']:
                        services.append({
                            "name": providers[service["provider_id"]],
                            "link": service["urls"]["standard_web"]
                        })
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
