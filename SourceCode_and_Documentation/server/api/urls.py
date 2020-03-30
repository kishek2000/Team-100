from django.urls import path
from django.conf.urls import url
from django.views.generic import TemplateView
from . import views

urlpatterns = [
    path('api/lead/', views.LeadListCreate.as_view() ),
    path('api/home/', views.home_url),
    url(r'^.*$', TemplateView.as_view(template_name="api/index.html")),
]