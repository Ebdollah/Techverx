
from django.urls import path
from . import views

app_name = "leads"

urlpatterns = [

    path('', views.lead_list, name='lead_list'),
    path('create/', views.lead_create, name='lead_create'),
    path('<int:pk>/', views.lead_detail, name='lead_detail'),
    path('update/<int:pk>/', views.lead_update, name='lead_update'),
    path('delete/<int:pk>/', views.lead_delete, name='lead_delete'),
]
