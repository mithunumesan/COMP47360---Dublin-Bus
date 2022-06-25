from rest_framework import serializers
from .models import Dublinbusapp

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dublinbusapp
        fields = ('id' ,'title', 'description', 'completed')