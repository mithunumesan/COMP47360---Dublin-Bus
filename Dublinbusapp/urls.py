from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    #path('home/', views.test)
    # path('home/',TemplateView.as_view(template_name='index.html'))
    path('home/', views.test, name='test'),
    # path('weather/', views.WeatherPage.as_view())
    path('weatherdata/',views.WeatherResponse),
    path('home/signup/', views.signup, name='signup'),
    path('home/signin/', views.signin, name='signin'),
]