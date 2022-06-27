from rest_framework import serializers
from .models import dublinbusapp

class DublinbusappSerializer(serializers.ModelSerializer):
    class Meta:
        model = dublinbusapp
        fields = ('id' ,'title', 'description', 'completed')