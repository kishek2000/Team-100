from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics
import requests
import pprint

from .get_categories import getWatchCategory, craftPosterURL, getWatchTrending, newMusicReleases, featuredPlaylists, getMovieData, getTVData, getAlbumSingleData, getPodcastData, getPlaylistData, getListenLinks, getTrackData, getListenLinks, categoryPlaylists
from .search_data import search, filtered_search
from .reviews import title_rating, tv_collection_ratings
from justwatch import JustWatch
from .definitions import findServices

# Create your views here.

# from django.views.decorators.http import require_GET, require_http_method


def home_watch(request):
    obj = {
        "Trending Daily": getWatchTrending(),
        "Top Rated TV Shows": getWatchCategory('/tv/', 'top_rated', 'name', country=None),
        "Popular TV Shows": getWatchCategory('/tv/', 'popular', 'name', country=None),
        "On Air TV Shows": getWatchCategory('/tv/', 'on_the_air', 'name', country=None),
        "Popular Movies": getWatchCategory('/movie/', 'popular', 'title', country=None),
        "Top Rated Movies": getWatchCategory('/movie/', 'top_rated', 'title', country=None),
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
    data = search(query, ['tv', 'movies'], 50)
    obj = {
        "Search Results": {"TV Results": data['tv'], "Movie Results": data['movies']}
    }
    return JsonResponse(obj)


def search_listen(request, query):
    data = search(query, ['music', 'podcasts'], 50)
    data['music'].update(data['podcasts'])
    obj = {
        "Search Results": data['music']
    }
    return JsonResponse(obj)


def details_tv(request, id):
    data = getTVData(int(id))
    obj = {
        "data": data
    }
    return JsonResponse(obj)


def review_title(request, id, media):
    obj = {
        'rating': title_rating(id, media)
    }
    return JsonResponse(obj)


def details_movie(request, id):
    data = getMovieData(id)
    obj = {
        "data": data
    }
    return JsonResponse(obj)


def review_collection(request, id):
    obj = {'episodes': tv_collection_ratings(id)}
    return JsonResponse(obj)


def details_album(request, id):
    data = getAlbumSingleData(id)
    obj = {
        "data": data
    }
    return JsonResponse(obj)


def details_single(request, id):
    data = getAlbumSingleData(id, 'single')
    obj = {
        "data": data
    }
    return JsonResponse(obj)


def details_track(request, id):
    data = getTrackData(id)
    obj = {
        "data": data
    }
    return JsonResponse(obj)


def details_playlist(request, id):
    data = getPlaylistData(id)
    obj = {
        "data": data
    }
    return JsonResponse(obj)


def details_podcast(request, id):
    data = getPodcastData(id)
    obj = {
        "data": data
    }
    return JsonResponse(obj)


def region_service_filters(request, region):
    plist = []
    just_watch = JustWatch(country=region)
    aus_providers = just_watch.get_providers()
    for item in aus_providers:
        plist.append({"label": item["clear_name"],
                      "value": item["short_name"]})
    return JsonResponse({"list": plist})


def search_watch_filtered(request, query, services):
    data = filtered_search({"query": query, "providers": services.split('&')})
    obj = {
        "Search Results": data
    }
    return JsonResponse(obj)


def tmdb_streaming_services(request, id, title, popularity, score):
    services = findServices(id, title, popularity, score)
    obj = {
        'data': services
    }
    return JsonResponse(obj)


def listen_youtube_link(request, spotifyid, listen_type):
    link = getListenLinks(spotifyid, listen_type)
    obj = {
        "data": link
    }
    return JsonResponse(obj)


def listen_category_playlists(request, category_id):
    data = categoryPlaylists(category_id)
    obj = {
        "data": data
    }
    return JsonResponse(obj)


def bootstrap(request):
    return ''
