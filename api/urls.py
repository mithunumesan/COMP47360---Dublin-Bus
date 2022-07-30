from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
<<<<<<< Updated upstream
=======
from .views import UserViewSet, username
>>>>>>> Stashed changes
from .views import UserViewSet,UserFavouriteRouteDataListView,UserFavouriteRouteCreateView,UserFavouriteRouteUpdateView

router = routers.DefaultRouter()
router.register('users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
<<<<<<< Updated upstream
    path('<pk>',UserFavouriteRouteDataListView.as_view()),
    path('create/',UserFavouriteRouteCreateView.as_view()),
    path('<pk>/update/',UserFavouriteRouteUpdateView.as_view()),
]
=======
    path('username/', username.as_view()),
    # path('<pk>',UserFavouriteRouteDataListView.as_view()),
    # path('create/',UserFavouriteRouteCreateView.as_view()),
    # path('<pk>/update/',UserFavouriteRouteUpdateView.as_view()),
]
    
>>>>>>> Stashed changes
