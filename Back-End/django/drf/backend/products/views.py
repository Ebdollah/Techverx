from django.shortcuts import render
from rest_framework import generics
from .models import Product
from .serializers import GetProductSerializer, PostProductSerializer

# Create your views here.

class ProductDetailApiView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = GetProductSerializer
    #we want to look our data using pk
