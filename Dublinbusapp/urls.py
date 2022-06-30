from django.urls import path
from . import views


urlpatterns = [
    path('home/', views.test),
    # path('weather/', views.WeatherPage.as_view())

]