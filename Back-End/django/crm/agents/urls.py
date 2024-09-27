
from django.urls import path
from . import views

app_name = "agents"

urlpatterns = [
    path('', views.AgentListView, name='agents_list'),
    path('create/', views.AgentCreateView, name='agents_create'),
    path('<int:pk>/', views.AgentDetailView, name='agents_detail'),
    path('update/<int:pk>/', views.AgentUpdateView, name='agents_update'),
    path('delete/<int:pk>/', views.AgentDeleteView, name='agents_delete'),
]
