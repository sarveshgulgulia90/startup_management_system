

from django.urls import path,include
from rest_framework.routers import DefaultRouter

from .views import StartupCreateView,StartupDetailView,StartupListView,EmployeeListCreateAPI,EmployeeDeleteAPI,JobListCreateAPI,JobDeleteAPI,JobDetailAPI, ApplicationListCreateAPI


urlpatterns = [
    path('create/',StartupCreateView.as_view(),name="create_startup"),
    path('list/',StartupListView.as_view(),name="list_startup"),
    path('detail/<uuid:static_id>/',StartupDetailView.as_view(),name="detail_startup"),
    path('employees/<uuid:static_id>/',EmployeeListCreateAPI.as_view()),
    path('employees/delete/<uuid:static_id>/',EmployeeDeleteAPI.as_view()),
    path('jobs/<uuid:static_id>/',JobListCreateAPI.as_view()),
    path('jobs/delete/<uuid:static_id>/',JobDeleteAPI.as_view()),
    path('jobs/detail/<uuid:static_id>/',JobDetailAPI.as_view()),
    path('applications/',ApplicationListCreateAPI.as_view())
]