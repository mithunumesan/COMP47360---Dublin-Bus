from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
<<<<<<< Updated upstream
from .models import UserFavouriteRoute

from api.models import UserFavouriteRoute
=======
from api.models import UserFavouriteRoute

>>>>>>> Stashed changes

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
<<<<<<< Updated upstream
        Token.objects.create(user=user)
=======
        token = Token.objects.create(user=user)
        print(token.key)
>>>>>>> Stashed changes
        return user

class UserFavouriteRouteSerializer(serializers.ModelSerializer):
      class Meta:
        model = UserFavouriteRoute
        fields = '__all__'