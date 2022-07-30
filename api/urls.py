from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet,UserFavouriteRouteDataListView,UserFavouriteRouteCreateView,UserFavouriteRouteUpdateView

router = routers.DefaultRouter()
router.register('users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('<pk>',UserFavouriteRouteDataListView.as_view()),
    path('create/',UserFavouriteRouteCreateView.as_view()),
    path('<pk>/update/',UserFavouriteRouteUpdateView.as_view()),
]