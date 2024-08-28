from django.urls import path
from django.shortcuts import HttpResponse

from . import views

urlpatterns = [
    # path('', lambda request : HttpResponse("Landing page"), name='ind'),

    path('challenges', views.month_list, name='month_challenge'),
    path('', views.month_list, name='month_challenge'), #will work for /challenges
    path("<int:month>", views.monthly_challenges_by_number),

    path("<str:month>", views.monthly_challenge, name="month_challenge"),
    # path('jan' , views.jan, name='jan' ),
    # path('feb' , views.feb, name='feb' ),
]