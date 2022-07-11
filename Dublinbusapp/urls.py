from django.urls import path , include
from . import views
from django.views.generic import TemplateView
from rest_framework import routers
from Dublinbusapp import views

router = routers.DefaultRouter()
router.register(r'Stops', views.StopsView, 'Stops')

urlpatterns = [
    #path('home/', views.test)
    path('',TemplateView.as_view(template_name='index.html')),
    path('api/', include(router.urls)),
]