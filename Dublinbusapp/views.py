from django.shortcuts import render
from django.http import HttpResponse
from requests import Response
from .serializers import AllTripSerializer, DublinbusappSerializer, RoutesSerializer, ShapeSerializer, TripScheduleSerializer
from .serializers import StopsSerializer 
from rest_framework import viewsets      
from .models import AllTrip, Dublinbusapp, Routes, Shape, TripSchedule
from .models import Stops
from rest_framework import generics
from django.db.models import Min, Max

def test(request):
    return render(request, 'main.html')

class DublinbusappView(viewsets.ModelViewSet):
    serializer_class = DublinbusappSerializer   
    queryset = Dublinbusapp.objects.all()

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


class TripScheduleListView(generics.ListAPIView):
    serializer_class = TripScheduleSerializer
    

    def get_queryset(self):

        queryset = TripSchedule.objects.all()
        route_short_name = self.request.query_params.get('routeshortname','')
        stop_name = self.request.query_params.get('stopname','')
        arrival_time = self.request.query_params.get('arrivaltime','')

        if route_short_name is not None and stop_name is not None and arrival_time is not None:
            queryset = queryset.filter(routeshortname=route_short_name,stopname__startswith=stop_name,arrivaltime__gte=arrival_time).order_by('arrivaltime')[:1]
            # min = queryset.annotate(Min('arrivaltime'))
            # queryset = queryset.filter(routeshortname=route_short_name,stopname__startswith=stop_name,arrivaltime=min)
            
            # queryset = queryset.filter(routeshortname=route_short_name,stopname__startswith=stop_name)
            
            
        return queryset

class TripFindListView(generics.ListAPIView):
    serializer_class = TripScheduleSerializer
    

    def get_queryset(self):

        queryset = TripSchedule.objects.all()
        trip_id = self.request.query_params.get('tripid','')
        

        if trip_id is not None:
            queryset = queryset.filter(tripid=trip_id,stopsequence=1)
            # min = queryset.annotate(Min('arrivaltime'))
            # queryset = queryset.filter(routeshortname=route_short_name,stopname__startswith=stop_name,arrivaltime=min)
            
            # queryset = queryset.filter(routeshortname=route_short_name,stopname__startswith=stop_name)
            
            
        return queryset