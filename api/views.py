import imp
from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import UserFavouriteRouteSerializer, UserSerializer
from rest_framework.generics import ListAPIView,RetrieveAPIView,CreateAPIView,UpdateAPIView,CreateAPIView
from .models import UserFavouriteRoute

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserFavouriteRouteDataListView(ListAPIView):
    queryset = UserFavouriteRoute.objects.all()
    serializer_class=UserFavouriteRouteSerializer

class UserFavouriteRouteDataDetailtView(RetrieveAPIView):
    queryset = UserFavouriteRoute.objects.all()
    serializer_class=UserFavouriteRouteSerializer

class UserFavouriteRouteCreateView(CreateAPIView):
    queryset = UserFavouriteRoute.objects.all()
    serializer_class=UserFavouriteRouteSerializer

class UserFavouriteRouteUpdateView(UpdateAPIView):
    queryset = UserFavouriteRoute.objects.all()
    serializer_class=UserFavouriteRouteSerializer