from django.shortcuts import render
from django.http import HttpResponse
from .serializers import DublinbusappSerializer, WeatherDataSerializer
from rest_framework import viewsets      
from .models import Dublinbusapp, WeatherData

import decimal
from datetime import datetime, timedelta
import pytz
from django.views.generic import TemplateView
from .models import WeatherData
from Dublinbusapp.forecastUpdater import forecast_api

    


def test(request):
    try:
        latest_forecast = WeatherData.objects.latest('timestamp')
    except:
        latest_forecast = None
    # print("latest forecast time is:", latest_forecast)
    an_hour_ago = datetime.now(tz=pytz.timezone('Europe/Dublin')) - timedelta(hours=1)
    # print("what is" ,latest_forecast.timestamp, "this is", type(latest_forecast.timestamp))
    
    if latest_forecast is None or (latest_forecast.timestamp < an_hour_ago):
        forecast_api.update_forecast()
        latest_forecast = WeatherData.objects.latest('timestamp')
        print("FORECAST UPDATED")


    temperature_in_c = latest_forecast.temperatue
    temperature_in_f = (latest_forecast.temperatue * decimal.Decimal(1.8)) + 32
    description = latest_forecast.description.capitalize
    timestamp = "{t.year}/{t.month:02d}/{t.day:02d} - {t.hour:02d}:{t.minute:02d}:{t.second:02d}".format( t=latest_forecast.timestamp)
    
    return render(request, 
    'main.html',
    {
                'temperature_in_c': temperature_in_c,
                'temperature_in_f': round(temperature_in_f,2),
                'description': description,
                'utc_update_time': timestamp})

class DublinbusappView(viewsets.ModelViewSet):  
    serializer_class = DublinbusappSerializer   
    queryset = Dublinbusapp.objects.all() 

class WeatherDataView(viewsets.ModelViewSet):  
    serializer_class = WeatherDataSerializer   
    queryset = WeatherData.objects.all() 


# class WeatherPage(TemplateView):
#     def get(self, request, **kwargs):
        

#         return render(
#             request, 
#             'index.html', 
#             {
#                 'temperature_in_c': temperature_in_c,
#                 'temperature_in_f': round(temperature_in_f,2),
#                 'description': description,
#                 'utc_update_time': timestamp})