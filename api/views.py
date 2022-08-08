from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser 
from rest_framework.decorators import api_view

from django.contrib.auth.models import User
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt


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


class UserFavouriteRouteDataListView(viewsets.ModelViewSet):
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


@csrf_exempt
def add_favorite(request):
    if request.method == 'GET':  
        routes = UserFavouriteRoute.objects.all()

        userfavouriteroute_serializer = UserFavouriteRouteSerializer(routes, many=True)

        return JsonResponse(userfavouriteroute_serializer.data, safe=False)


    elif request.method == 'POST':

        route_data = JSONParser().parse(request)
        userfavouriteroute_serializer = UserFavouriteRouteSerializer(data=route_data)

        if userfavouriteroute_serializer.is_valid():
            userfavouriteroute_serializer.save()
            return JsonResponse(userfavouriteroute_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(userfavouriteroute_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # elif request.method =="GET":

@api_view(['GET', 'PUT', 'DELETE'])
def detail(request, pk):
    print("we in this now")
    
    
    
    if request.method == 'GET': 
        try:
            routes = UserFavouriteRoute.objects.filter(user=pk)

            userfavouriteroute_serializer = UserFavouriteRouteSerializer(routes, many=True) 
        #     return JsonResponse(userfavouriteroute_serializer.data) 

            return Response(userfavouriteroute_serializer.data)
        
        except:
            print("ID not there yet")

            return Response("ID not there yet")


    elif request.method == 'DELETE':
        
        routes = UserFavouriteRoute.objects.filter(id=pk)
        routes.delete()
        return JsonResponse({'message': 'Route was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)




@api_view(['GET', 'PUT', 'DELETE'])
def fetch_route(request, pk):
    
    
    
    if request.method == 'GET': 
        routes = UserFavouriteRoute.objects.filter(id=pk)

        userfavouriteroute_serializer = UserFavouriteRouteSerializer(routes, many=True) 
    #     return JsonResponse(userfavouriteroute_serializer.data) 

        return Response(userfavouriteroute_serializer.data)