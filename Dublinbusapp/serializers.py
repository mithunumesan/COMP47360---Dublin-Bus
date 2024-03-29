from rest_framework import serializers
from .models import AllTrip, Dublinbusapp, Routes, Shape, TripSchedule
from .models import Stops

class DublinbusappSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dublinbusapp
        fields = ('id' ,'title', 'description', 'completed')

class StopsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stops
        fields = '__all__'

class RoutesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Routes
        fields = '__all__'

class AllTripSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllTrip
        fields = '__all__'

class ShapeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shape
        fields = ('shapeid','lat','lng')

class TripScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = TripSchedule
        fields = '__all__'

