from django.urls import path
from . import views


urlpatterns = [
    path('testDjango/', views.test)


]