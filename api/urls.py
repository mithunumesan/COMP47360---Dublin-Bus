from django.contrib import admin
from django.urls import path, include
from requests import request
from rest_framework import routers
from .views import UserViewSet, username

router = routers.DefaultRouter()
router.register('users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('username/', username.as_view()),
    
]