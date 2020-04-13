'''
Authorises application to use spotify and refreshes spotify token.
'''

import requests
SPOTIFY_CLIENT_ID = "f92e0a30996c4c1e870c5b2cfe2e58c0"

parameters = {
    "client_id": SPOTIFY_CLIENT_ID,
    "response_type": "code",
    "redirect_uri": "http://localhost:3000/",
    "scope": "user-read-playback-state user-modify-playback-state user-read-currently-playing streaming app-remote-control user-top-read user-read-recently-played"
}
response = requests.get("https://accounts.spotify.com/authorize", params = parameters)
print(response.text)