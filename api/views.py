from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

from .serializers import UserSerializer,UserFavouriteRouteSerializer

from rest_framework.generics import ListAPIView,RetrieveAPIView,CreateAPIView,UpdateAPIView
from .models import UserFavouriteRoute

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class username(APIView):
    authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]
    # token_classes = [TokenAuthentication]

    def get(self, request, format=None):
        # print(request.headers)
        content = {
            'userid': str(request.user.id),
            'username': str(request.user.username)
        }
        return Response(content)

# @api_view(['GET'])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
# @permission_classes([IsAuthenticated])
# def username2(request, format=None):
#     content = {
#         'username': str(request.user.username)
#     }
#     return Response(content)

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
