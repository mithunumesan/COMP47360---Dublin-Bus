from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class username(APIView):
    authentication_classes = [TokenAuthentication]


    def get(self, request, format=None):
        # print(request.headers)
        content = {
            'userid': str(request.user.id),
            'username': str(request.user.username)
        }
        return Response(content)

