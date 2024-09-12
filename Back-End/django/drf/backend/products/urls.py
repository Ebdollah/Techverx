from django.urls import path
from .views import ProductDetailApiView, ProductCreateApiView

urlpatterns = [
    path('<int:pk>/', ProductDetailApiView.as_view(), name='product_detail'),
    path('create/', ProductCreateApiView.as_view(), name='product_create'),
]