from django.urls import path , include
from . import views
from django.views.generic import TemplateView
from rest_framework import routers
from Dublinbusapp.views import *


router = routers.DefaultRouter()
router.register(r'Stops', views.StopsView, 'Stops')
router.register(r'Routes', views.RoutesView, 'Routes')



urlpatterns = [
    #path('home/', views.test)
    path('',TemplateView.as_view(template_name='index.html')),
    path('api/', include(router.urls)),
    path('api/alltrip/', AllTripListView.as_view()),
    path('api/shape/', ShapeListView.as_view()),
    #path('api/tripschedule/', TripScheduleListView.as_view()),
    #path('api/tripfind/', TripFindListView.as_view()),
    path('api/tripschedule/', TripScheduleListView.as_view())
]