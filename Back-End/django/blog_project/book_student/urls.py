
from django.urls import path, include
from book_student import views

urlpatterns = [
       path('', views.index, name='index'),
]
