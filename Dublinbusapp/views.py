from django.shortcuts import redirect, render
from django.http import JsonResponse
# from flask import redirect
from .serializers import DublinbusappSerializer, WeatherDataSerializer
from rest_framework import viewsets      
from .models import Dublinbusapp, WeatherData

import decimal
from datetime import datetime, timedelta
import pytz
from django.views.generic import TemplateView
from Dublinbusapp.forecastUpdater import forecast_api
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate,login
from django.contrib.auth import get_user_model

User = get_user_model()
users = User.objects.all()

print(users)



    
def test(request):
    return render(request, 'main.html')

def WeatherResponse(request):
    try:
        latest_forecast = WeatherData.objects.latest('timestamp')
    except:
        latest_forecast = None

    an_hour_ago = datetime.now(tz=pytz.timezone('Europe/Dublin')) - timedelta(hours=1)
    
    if latest_forecast is None or (latest_forecast.timestamp < an_hour_ago):
        forecast_api.update_forecast()
        latest_forecast = WeatherData.objects.latest('timestamp')
        print("FORECAST UPDATED")


    temperature_in_c = latest_forecast.temperatue
    temperature_in_f = (latest_forecast.temperatue * decimal.Decimal(1.8)) + 32
    description = latest_forecast.description.capitalize()
    timestamp = "{t.year}/{t.month:02d}/{t.day:02d} - {t.hour:02d}:{t.minute:02d}:{t.second:02d}".format( t=latest_forecast.timestamp)
    
    return JsonResponse({
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

def signup(request):

    if request.method == "POST":
        username = request.POST['username']
        email = request.POST['email']
        pass1 = request.POST['pass1']
        pass2 = request.POST['pass2']

        myuser = User.objects.create_user(username, email, pass1)
        myuser.u_name = username

        myuser.save()

        messages.success(request, "Account Successfully Created.")

        return redirect('signin')

    return render(request, 'signup.html')

def signin(request):

    if request.method == "POST":
        username = request.POST['username']
        pass1 = request.POST['pass1']

        user = authenticate(username = username, password = pass1)

        if user is not None:
            login(request, user)
            return render(request,"main.html", {'uname': username})
        else:
            messages.error(request, "bad credentials")
            return redirect('test')

    return render(request,'signin.html')

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