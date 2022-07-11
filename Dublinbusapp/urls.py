from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    #path('home/', views.test)
    path('',TemplateView.as_view(template_name='index.html'))
]