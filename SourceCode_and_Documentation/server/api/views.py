from django.shortcuts import render
from django.http import JsonResponse
import requests

from .get_categories import getWatchCategory, craftPosterURL, getWatchTrending, newMusicReleases
from .models import Lead
from .serializers import LeadSerializer
from rest_framework import generics
# Create your views here.

#from django.views.decorators.http import require_GET, require_http_method

def home_url(request):
    tvOnAir = getWatchCategory('/tv/', 'on_the_air', 'name')
    tvTopRated = getWatchCategory('/tv/', 'top_rated', 'name')
    movieTopRated = getWatchCategory('/movie/', 'top_rated', 'title')
    trendingDaily = getWatchTrending()

    newReleases = newMusicReleases(10)


    watchData = [
        {"Now Airing TV Shows": tvOnAir},
        {"Top Rated TV Shows": tvTopRated},
        {"Top Rated Movies": movieTopRated},
        {"Trending Daily": trendingDaily}
        # {"Genres": GenreData}
    ]

    listenData = [
        {"New Releases": newReleases}
    ]

    obj={
        "watch_data": watchData,
        "listen_data": listenData
    }
    return JsonResponse(obj)

def bootstrap(request):
    return ''

class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer