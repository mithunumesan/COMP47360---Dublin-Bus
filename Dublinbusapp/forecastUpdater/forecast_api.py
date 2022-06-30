import os
import requests
from Dublinbusapp.models import WeatherData
#from scheduler.config_stuff import config


def _get_forecast_json():
    print("get forecast json accessed")
    url = 'http://api.openweathermap.org/data/2.5/onecall?lat=53.3065282883422&lon=-6.225434257607019&appid='

    with open('weather_key.txt') as f:
        weather_key = ''.join(f.readlines())
        weather_key = str(weather_key).split()[0]

    r = requests.get(url + weather_key)
    
    try:
        print(r)
        r.raise_for_status()
        return r.json()
    except:
        return None

def update_forecast():
    print("update forecast accessed")
    json = _get_forecast_json()
    if json is not None:
        try:
            print("try block")
            new_forecast = WeatherData()
            
            temp_in_celsius = json['current']['feels_like'] - 273.15
            new_forecast.temperatue = temp_in_celsius
            new_forecast.description = json['current']['weather'][0]['description']
            print("temp in celsius:",new_forecast.temperatue)
            print("new forecast object", new_forecast)
            new_forecast.save()
            print("saving...\n" + new_forecast)
        except:
            pass