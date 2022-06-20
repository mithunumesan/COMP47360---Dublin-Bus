import os
import requests
from weather.models import Forecast
#from scheduler.config_stuff import config


def _get_forecast_json():
    url = 'http://api.openweathermap.org/data/2.5/onecall?lat=53.3065282883422&lon=-6.225434257607019&appid='

    with open('weather_key.txt') as f:
        weather_key = ''.join(f.readlines())
        weather_key = str(weather_key).split()[0]

    r = requests.get(url + weather_key)
    
    try:
        r.raise_for_status()
        return r.json()
    except:
        return None

def update_forecast():
    json = _get_forecast_json()
    if json is not None:
        try:
            new_forecast = Forecast()

            temp_in_celsius = json['current']['feels_like'] - 273.15
            new_forecast.temperatue = temp_in_celsius
            new_forecast.description = json['current']['weather'][0]['description']
            
            new_forecast.save()
            print("saving...\n" + new_forecast)
        except:
            pass