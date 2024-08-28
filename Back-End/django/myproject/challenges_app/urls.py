from django.urls import path
from django.shortcuts import HttpResponse

from . import views

urlpatterns = [
    path('', lambda request : HttpResponse("Landing page"), name='ind'),
    path('jan' , views.jan, name='jan' ),
    path('feb' , views.feb, name='feb' ),
]