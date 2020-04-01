from django.urls import path
from django.conf.urls import url
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path('api/watch', views.home_url_watch),
    path('api/listen', views.home_url_listen),
    url(r'^.*$', TemplateView.as_view(template_name="api/index.html")),
]