from django.shortcuts import render
from rest_framework import generics
from .models import Product
from .serializers import GetProductSerializer, PostProductSerializer

# Create your views here.

class ProductCreateApiView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = PostProductSerializer

    def perform_create(self, serializer):
       # serializer.save(user=self.request.user)
       title = serializer.validated_data.get('title')
       content = serializer.validated_data.get('content') or None
       if content is None:
           content = title
       serializer.save(content=content)
       # send a Django signal

class ProductDetailApiView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = GetProductSerializer
    #we want to look our data using pk
