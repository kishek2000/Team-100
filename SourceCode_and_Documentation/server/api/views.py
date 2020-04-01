from django.shortcuts import render
from django.http import JsonResponse
import requests

from .get_categories import getWatchCategory, craftPosterURL, getWatchTrending, newMusicReleases
from .search_data import search
from .models import Lead
from .serializers import LeadSerializer
from rest_framework import generics
# Create your views here.

#from django.views.decorators.http import require_GET, require_http_method

def home_watch(request):
    tvOnAir = getWatchCategory('/tv/', 'on_the_air', 'name')
    tvTopRated = getWatchCategory('/tv/', 'top_rated', 'name')
    movieTopRated = getWatchCategory('/movie/', 'top_rated', 'title')
    trendingDaily = getWatchTrending()

    obj = {
        "Now Airing TV Shows": tvOnAir,
        "Top Rated TV Shows": tvTopRated,
        "Top Rated Movies": movieTopRated,
        "Trending Daily": trendingDaily
    }
    return JsonResponse(obj)

def home_listen(request):
    newReleases = newMusicReleases(10)

    obj={
        "New Releases": newReleases,
    }
    return JsonResponse(obj)

def search_watch(request, query):
    data = search(query, ['tv', 'movies'], 4)
    obj={
        "Search Results": {"TV Results": data['tv'], "Movie Results": data['movies']}
    }
    return JsonResponse(obj)

# def search_listen(request, query):
#     data = search(query, ['music'], 4)
#     obj={
#         "Search Results": {"All Music Results": data['music']}
#     }

def bootstrap(request):
    return ''
