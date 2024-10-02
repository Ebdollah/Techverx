
from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('notes/', views.NoteListCreate.as_view(), name = 'note-list')
]
