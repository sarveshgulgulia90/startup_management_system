from django.urls import path,include

from .views import RegisterAPI,LoginAPI,GetUserAPI,LogoutAPI

urlpatterns = [
    path('register/',RegisterAPI.as_view()),
    path('login/',LoginAPI.as_view()),
    path('get_user/',GetUserAPI.as_view()),
    path('logout/',LogoutAPI.as_view())

]