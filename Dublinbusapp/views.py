from django.shortcuts import render
from django.http import HttpResponse
from .serializers import DublinbusappSerializer, RoutesSerializer 
from .serializers import StopsSerializer 
from rest_framework import viewsets      
from .models import Dublinbusapp, Routes
from .models import Stops

def test(request):
    return render(request, 'main.html')

class DublinbusappView(viewsets.ModelViewSet):
    serializer_class = DublinbusappSerializer   
    queryset = Dublinbusapp.objects.all()

class StopsView(viewsets.ModelViewSet):
    serializer_class = StopsSerializer   
    queryset = Stops.objects.all()

class StopsView(viewsets.ModelViewSet):
    serializer_class = StopsSerializer   
    queryset = Stops.objects.all()

class RoutesView(viewsets.ModelViewSet):
    serializer_class = RoutesSerializer  
    queryset = Routes.objects.all()

