from rest_framework import serializers
from .models import Dublinbusapp, WeatherData

class DublinbusappSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dublinbusapp
        fields = ('id' ,'title', 'description', 'completed')

class WeatherDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeatherData
        fields = ('id','timestamp','temperatue','description')