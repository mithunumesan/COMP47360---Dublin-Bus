import imp
from rest_framework import viewsets
from django.contrib.auth.models import User
<<<<<<< Updated upstream
from .serializers import UserFavouriteRouteSerializer, UserSerializer
from rest_framework.generics import ListAPIView,RetrieveAPIView,CreateAPIView,UpdateAPIView,CreateAPIView
=======

from .serializers import UserSerializer,UserFavouriteRouteSerializer

from rest_framework.generics import ListAPIView,RetrieveAPIView,CreateAPIView,UpdateAPIView
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
class UserFavouriteRouteUpdateView(UpdateAPIView):
    queryset = UserFavouriteRoute.objects.all()
    serializer_class=UserFavouriteRouteSerializer
=======
# @api_view(['GET'])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
# @permission_classes([IsAuthenticated])
# def username2(request, format=None):
#     content = {
#         'username': str(request.user.username)
#     }
#     return Response(content)

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
>>>>>>> Stashed changes
