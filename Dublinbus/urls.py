"""Dublinbus URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from posixpath import relpath
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers                 
from Dublinbusapp import views
from rest_framework.authtoken.views import obtain_auth_token
from django.conf import settings
from django.views.generic import TemplateView


router = routers.DefaultRouter()                   
router.register(r'Dublinbusapps', views.DublinbusappView, 'Dublinbusapp') 
routes = getattr(settings, 'REACT_ROUTES', [])

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('Dublinbusapp.urls')),
    path('api/', include(router.urls)),
    path('loginapi/', include('api.urls')),
    path('auth/', obtain_auth_token),
]

for route in routes:
    urlpatterns += [
        path('{}'.format(route), TemplateView.as_view(template_name='index.html'))
    ]
