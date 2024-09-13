from django.urls import path
from api import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('', views.api_home, name='api'),
    path('auth/', obtain_auth_token, name='auth'),
]