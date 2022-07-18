from rest_framework import serializers
from .models import Dublinbusapp, Routes
from .models import Stops
class DublinbusappSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dublinbusapp
        fields = ('id' ,'title', 'description', 'completed')

class StopsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stops
        fields = ('stopid' ,'stopname', 'latitude', 'longitude')

class RoutesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Routes
        fields = '__all__'