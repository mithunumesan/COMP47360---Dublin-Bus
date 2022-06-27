from django.shortcuts import render
from django.http import HttpResponse
from .serializers import DublinbusappSerializer 
from rest_framework import viewsets      
from .models import dublinbusapp

def test(request):
    return render(request, 'main.html')

class DublinbusappView(viewsets.ModelViewSet):  
    serializer_class = DublinbusappSerializer   
    queryset = dublinbusapp.objects.all() 