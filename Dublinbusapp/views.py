from django.shortcuts import render
from django.http import HttpResponse
from requests import Response
from .serializers import AllTripSerializer, DublinbusappSerializer, RoutesSerializer, ShapeSerializer
from .serializers import StopsSerializer 
from rest_framework import viewsets      
from .models import AllTrip, Dublinbusapp, Routes, Shape
from .models import Stops
from rest_framework import generics

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

class AllTripListView(generics.ListAPIView):
    serializer_class = AllTripSerializer

    def get_queryset(self):

        queryset = AllTrip.objects.all()
        shape_id = self.request.query_params.get('shapeid','')
        if shape_id is not None:
            queryset = queryset.filter(shapeid=shape_id)
        return queryset

    
class ShapeListView(generics.ListAPIView):
    serializer_class = ShapeSerializer
    

    def get_queryset(self):

        queryset = Shape.objects.all()
        shape_id = self.request.query_params.get('shapeid','')
        if shape_id is not None:
            queryset = queryset.filter(shapeid=shape_id)
            
        return queryset