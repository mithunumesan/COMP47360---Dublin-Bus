from django.contrib import admin
from django.urls import path, include
from requests import request
from . import views
from rest_framework import routers
from .views import UserViewSet, username, UserFavouriteRouteDataListView, add_favorite, detail

router = routers.DefaultRouter()
router.register(r'users', UserViewSet, "users")
router.register(r'favorites', UserFavouriteRouteDataListView, "favorites")

urlpatterns = [
    path('', include(router.urls)),
    path('username/', username.as_view()),
    path('addfavorites/', views.add_favorite),
    path('details/<str:pk>/', views.detail),
]