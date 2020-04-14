from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics
import requests
import pprint

from .get_categories import getWatchCategory, craftPosterURL, getWatchTrending, newMusicReleases, featuredPlaylists, getMovieData, getTVData
from .search_data import search
from .reviews import title_rating, tv_collection_ratings
# Create your views here.

# from django.views.decorators.http import require_GET, require_http_method


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
    newReleases = newMusicReleases(50)
    playlists = featuredPlaylists(20)

    obj = {
        "New Releases": newReleases,
        "Featured Playlists": playlists
    }
    return JsonResponse(obj)


def search_watch(request, query):
    data = search(query, ['tv', 'movies'], 4)
    obj = {
        "Search Results": {"TV Results": data['tv'], "Movie Results": data['movies']}
    }
    return JsonResponse(obj)


def search_listen(request, query):
    data = search(query, ['music', 'podcasts'], 20)
    print(data)
    print(query)
    data['music'].update(data['podcasts'])
    obj = {
        "Search Results": data['music']
    }
    return JsonResponse(obj)


def details_tv(request, id):
    print(id)
    data = getTVData(int(id))
    obj = {
        "data": data
    }
    return JsonResponse(obj)


def review_title(request, id):
    obj = {
        'rating': title_rating(id)
    }
    return JsonResponse(obj)


def details_movie(request, id):
    data = getMovieData(id)
    obj = {
        "data": data
    }
    return JsonResponse(obj)


def review_collection(request, id):  # TODO
    obj = {'episodes': tv_collection_ratings(id)}
    return JsonResponse(obj)


def bootstrap(request):
    return ''
