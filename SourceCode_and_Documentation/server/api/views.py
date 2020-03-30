from django.shortcuts import render
from django.http import JsonResponse
import requests

from .search_data import getWatchCategory, craftPosterURL
from .models import Lead
from .serializers import LeadSerializer
from rest_framework import generics
# Create your views here.

#from django.views.decorators.http import require_GET, require_http_method

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