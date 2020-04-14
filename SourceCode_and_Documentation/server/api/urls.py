from django.urls import path
from django.conf.urls import url
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path('api/home/watch', views.home_watch),
    path('api/home/listen', views.home_listen),
    path('api/search/watch/<str:query>', views.search_watch),
    path('api/search/listen/<slug:query>', views.search_listen),
    path('api/details/tv/<slug:id>', views.details_tv),
    path('api/details/movie/<slug:id>', views.details_movie),
    url(r'^.*$', TemplateView.as_view(template_name="api/index.html")),
]
