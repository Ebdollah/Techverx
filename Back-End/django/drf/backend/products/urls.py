from django.urls import path
from .views import (ProductDetailApiView, ProductCreateApiView, ProductListApiView,
                    product_alt_view, ProductUpdateAPIView, ProductDestroyAPIView,
                    ProductListCreateApiView)

urlpatterns = [
    path('', ProductListCreateApiView.as_view(), name='product-list_create'),
    path('<int:pk>/', ProductDetailApiView.as_view(), name='product_detail'),
    # path('<int:pk>/', product_alt_view, name='product_detail'),
    path('create/', ProductCreateApiView.as_view(), name='product_create'),
    # path('create/', product_alt_view, name='product_create'),
    path('list/', ProductListApiView.as_view(), name='product_list'),
    # path('list/', product_alt_view, name='product_list'),
    # path('delete/<int:pk>/', product_alt_view, name='product_delete'),
    path('delete/<int:pk>/', ProductDestroyAPIView.as_view(), name='product_delete'),
    # path('update/<int:pk>/', product_alt_view, name='product_update'),
    path('update/<int:pk>/', ProductUpdateAPIView.as_view(), name='product_update'),

]