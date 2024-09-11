from django.urls import path
from .views import ProductDetailApiView

urlpatterns = [
    path('<int:pk>/', ProductDetailApiView.as_view(), name='product_detail'),
]