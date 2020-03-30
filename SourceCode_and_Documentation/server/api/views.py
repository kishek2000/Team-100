from django.shortcuts import render
from django.http import JsonResponse
import requests

from .definitions import TMDB_API_KEY, TMDB_URL, TMDB_BASE_IMG_URL
from .models import Lead
from .serializers import LeadSerializer
from rest_framework import generics
# Create your views here.

def craftPosterURL(path):
    '''Crafts a full url for a TMDB poster based on the path'''
    return TMDB_BASE_IMG_URL + "original" + path

#from django.views.decorators.http import require_GET, require_http_method
def getWatchCategory(media, category, nameKey):
    parameters = {
        "api_key": TMDB_API_KEY
    }
    res = requests.get(TMDB_URL + media + category, params=parameters)
    json = res.json()["results"][0:4]
    mediaObjects = []
    for result in json:
        mediaObjects.append({
            "name": result[nameKey],
            "imgURL": craftPosterURL(result["poster_path"])
        })
    return mediaObjects

def home_url(request):
    tvOnAir = getWatchCategory('/tv/', 'on_the_air', 'name')
    tvTopRated = getWatchCategory('/tv/', 'top_rated', 'name')
    movieTopRated = getWatchCategory('/movie/', 'top_rated', 'title')

    watchData = [
        {"Now Airing TV Shows": tvOnAir},
        {"Top Rated TV Shows": tvTopRated},
        {"Top Rated Movies": movieTopRated}
    ]

    obj={
        "watch_data": watchData,
        "listen_data": {}
    }
    return JsonResponse(obj)

def bootstrap(request):
    return ''

class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer