from django.shortcuts import render
from django.http import JsonResponse
import requests

from .get_categories import getWatchCategory, craftPosterURL, getWatchTrending, newMusicReleases
from .models import Lead
from .serializers import LeadSerializer
from rest_framework import generics
# Create your views here.

#from django.views.decorators.http import require_GET, require_http_method

def home_url_watch(request):
    tvOnAir = getWatchCategory('/tv/', 'on_the_air', 'name')
    tvTopRated = getWatchCategory('/tv/', 'top_rated', 'name')
    movieTopRated = getWatchCategory('/movie/', 'top_rated', 'title')
    trendingDaily = getWatchTrending()

    watchData = {
        "Now Airing TV Shows": tvOnAir,
        "Top Rated TV Shows": tvTopRated,
        "Top Rated Movies": movieTopRated,
        "Trending Daily": trendingDaily
        # {"Genres": GenreData}
    }
    
    return JsonResponse(watchData)

def home_url_listen(request):
    newReleases = newMusicReleases(10)

    listenData = {
        "New Releases": newReleases
    }

    return JsonResponse(listenData)




def bootstrap(request):
    return ''
