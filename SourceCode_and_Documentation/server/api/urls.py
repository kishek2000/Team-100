from django.urls import path
from django.conf.urls import url
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path('api/home/watch', views.home_watch),
    path('api/home/listen', views.home_listen),
    path('api/search/watch/<str:query>', views.search_watch),
    path('api/search/listen/<str:query>', views.search_listen),
    path('api/details/tv/<slug:id>', views.details_tv),
    path('api/details/movie/<slug:id>', views.details_movie),
    path('api/reviews/title/<str:id>', views.review_title),
    path('api/reviews/episodes/<str:id>', views.review_collection),
    # path('api/search/all/<slug:query>', views.search_all),
    url(r'^.*$', TemplateView.as_view(template_name="api/index.html")),
]
