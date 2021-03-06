from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import generics
import requests
import pprint

from .get_categories import getMoreWatchCategory, craftPosterURL, getWatchTrending, newMusicReleases, featuredPlaylists, getMovieData, getTVData, getAlbumSingleData, getPodcastData, getPlaylistData, getListenLinks, getTrackData, getListenLinks, categoryPlaylists, getWatchCategoryFiltered
from .search_data import search, filtered_search
from .reviews import title_rating, tv_collection_ratings
from justwatch import JustWatch
from .definitions import findServices

# Create your views here.

# from django.views.decorators.http import require_GET, require_http_method


def home_watch(request):
    obj = {
        "Trending TV Shows": getMoreWatchCategory('/tv/', 'popular', country=None, min=20),
        "Trending Movies": getMoreWatchCategory('/movie/', 'popular', country=None, min=20),
        "Top Rated TV Shows": getMoreWatchCategory('/tv/', 'top_rated', country=None, min=20),
        "Top Rated Movies": getMoreWatchCategory('/movie/', 'top_rated', country=None, min=20),
        "On Air TV Shows": getMoreWatchCategory('/tv/', 'on_the_air', country=None, min=20),
        "On Air Movies": ''
    }
    return JsonResponse(obj)


def home_watch_filtered(request, mgenres, tgenres, category):
    if mgenres == 'none':
        mgenres = ''
    if tgenres == 'none':
        tgenres = ''

    obj = {
        "Trending TV Shows": getWatchCategoryFiltered('/tv/', 'popular', tv_filter=tgenres, country=None, min=20) if category == 'popular' and tgenres != '' else getMoreWatchCategory('/tv/', 'popular', country=None, min=20),
        "Trending Movies": getWatchCategoryFiltered('/movie/', 'popular', movie_filter=mgenres, country=None, min=20) if category == 'popular' and mgenres != '' else getMoreWatchCategory('/movie/', 'popular', country=None, min=20),
        "Top Rated TV Shows": getWatchCategoryFiltered('/tv/', 'top_rated', tv_filter=tgenres, country=None, min=20) if category == 'top_rated' else getMoreWatchCategory('/tv/', 'top_rated', country=None, min=20),
        "Top Rated Movies": getWatchCategoryFiltered('/movie/', 'top_rated', movie_filter=mgenres, country=None, min=20) if category == 'top_rated' and mgenres != '' else getMoreWatchCategory('/movie/', 'top_rated', country=None, min=20),
        "On Air TV Shows": getWatchCategoryFiltered('/tv/', 'on_the_air', tv_filter=tgenres, country=None, min=20) if category == 'now_showing' and tgenres != '' else getMoreWatchCategory('/tv/', 'on_the_air', country=None, min=20),
        "On Air Movies": ''
    }
    return JsonResponse(obj)


def home_listen(request):
    newReleases = newMusicReleases(50)
    playlists = featuredPlaylists(20)

    obj = {
        "New Albums": newReleases["Albums"],
        "New Singles": newReleases["Singles"],
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


def tmdb_streaming_services(request, id, title, date, media_type):
    services = findServices(id, title, date, media_type)
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
