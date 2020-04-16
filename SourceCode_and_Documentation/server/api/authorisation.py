'''
Authorises application to use spotify and refreshes spotify token.
DEPRECATED because we didn't need it and it was a huge pain
'''

import requests
import threading
from definitions import SPOTIFY_AUTHORISATION
SPOTIFY_CLIENT_ID = "f92e0a30996c4c1e870c5b2cfe2e58c0"
redirect_uri = "http://localhost:3000/"

def requestSpotifyAuthorisation(redirect_uri):
    parameters = {
        "client_id": SPOTIFY_CLIENT_ID,
        "response_type": "code",
        "redirect_uri": redirect_uri,
        "scope": "user-read-playback-state user-modify-playback-state user-read-currently-playing streaming app-remote-control user-top-read user-read-recently-played"
    }
    response = requests.get("https://accounts.spotify.com/authorize", params = parameters)
    print(response.text)
    #return authorisationCode (don't know how to get this yet)

def requestSpotifyAccessToken(authorisationCode, redirect_uri):
    body = {
        'grant_type': "authorization_code",
        'code': authorisationCode,
        'redirect_uri': redirect_uri
    }
    header = {
        "Authorisation": SPOTIFY_AUTHORISATION
    }
    response = requests.post("https://accounts.spotify.com/api/token", data = body, headers = header)
    json = response.json()
    # Set up function to automatically refresh the token
    refreshTimer = threading.timer(json["expires_in"], requestSpotifyRefreshToken, args = [json["refresh_token"]])
    refreshTimer.start()
    spotifyToken = json["token_type"] + " " + json["access_token"]
    return {
        "access_token": spotifyToken,
        "refresh_token": json["refresh_token"]
        #"scopes": json["scope"] Dunno if we need this. Currently always the same scopes.
    }

def requestSpotifyRefreshToken(refreshToken):
    body = {
        'grant_type': "authorization_code",
        'refresh_token': refreshToken
    }
    header = {
        "Authorisation": SPOTIFY_AUTHORISATION
    }
    response = requests.post("https://accounts.spotify.com/api/token", data = body, headers = header)
    json = response.json()
    refreshTimer = threading.timer(json["expires_in"], requestSpotifyRefreshToken, args = [json["refresh_token"]])
    refreshTimer.start()
    spotifyToken = json["token_type"] + " " + json["access_token"]
    #set a global access token variable I guess?
    #return spotifyToken is roughly what we want but this function is only called through timer