from django.shortcuts import render
from django.http import JsonResponse

from .models import Lead
from .serializers import LeadSerializer
from rest_framework import generics
# Create your views here.


#from django.views.decorators.http import require_GET, require_http_methods


def home_img(request):
    obj = {
        "home_img_url": "https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1401&q=80"
    }

    return JsonResponse(obj)


class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
