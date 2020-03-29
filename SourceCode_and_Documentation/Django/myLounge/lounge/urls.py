from django.urls import path
from . import views

urlpatterns = [
    path('api/lead/', views.LeadListCreate.as_view() ),
    path('api/home/image', views.home_img),
    #path('api/home/genre-images', views.genre_img),
]