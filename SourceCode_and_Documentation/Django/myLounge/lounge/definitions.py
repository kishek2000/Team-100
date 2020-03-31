import requests
TMDB_API_KEY = "6a347f3f994cdb8434d8698152dc44a8"
TMDB_URL = "https://api.themoviedb.org/3"

parameters = {
    "api_key": TMDB_API_KEY,
}
config = requests.get(TMDB_URL + "/configuration", params=parameters)

TMDB_BASE_IMG_URL = config.json()["images"]["secure_base_url"]

def tmdbToImdb(tmdbID, mediaType):
    '''Converts a tmdb id to an imdb id'''
    parameters = {
        "api_key": TMDB_API_KEY,
    }
    res = requests.get(TMDB_URL + "/" + mediaType + "/" + str(tmdbID) + "/external_ids", params=parameters)
    return res.json()["imdb_id"]

def genreIdsToString(genreIDs, mediaType):
    parameters = {
        "api_key": TMDB_API_KEY,
    }
    res = requests.get(TMDB_URL + "/genre/" + mediaType + "/list", params=parameters)
    genreString = ""
    for genre in res.json()["genres"]:
        if genre["id"] in genreIDs:
            genreString += genre["name"] + ", "
    if genreString != "":
        genreString = genreString[:-2]
    return genreString

def craftPosterURL(path):
    '''Crafts a full url for a TMDB poster based on the path'''
    return TMDB_BASE_IMG_URL + "original" + path