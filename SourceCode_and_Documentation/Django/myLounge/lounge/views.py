from django.shortcuts import render
from django.http import JsonResponse

from .models import Lead
from .serializers import LeadSerializer
from rest_framework import generics
# Create your views here.


#from django.views.decorators.http import require_GET, require_http_methods


def home(request):
    obj = {
        "home_img_url": "https://unsplash.com/photos/NodtnCsLdTE"
    }

    return JsonResponse(obj)


class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
