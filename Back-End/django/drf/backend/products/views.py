from django.core.serializers import serialize
from django.shortcuts import render
from .models import Product
from .serializers import GetProductSerializer, PostProductSerializer
from django.shortcuts import render, get_object_or_404 # type: ignore
from django.http import JsonResponse, HttpResponse, Http404 #type: ignore
from rest_framework import generics, status, mixins, permissions, authentication
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .permissions import IsStaffEditorPermission

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

class ProductListApiView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = GetProductSerializer

class ProductListCreateApiView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = PostProductSerializer
    authentication_classes = [authentication.SessionAuthentication]
    #Check all auth types
    permission_classes = [IsStaffEditorPermission]
    #check all the permission types, they are amazing
    #we have every kind of permissions

    def perform_create(self, serializer):
       # serializer.save(user=self.request.user)
       title = serializer.validated_data.get('title')
       content = serializer.validated_data.get('content') or None
       if content is None:
           content = title
       serializer.save(content=content)
       # send a Django signal

class ProductUpdateAPIView(generics.UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = PostProductSerializer
    lookup_field = 'pk'

    def perform_update(self, serializer):
        instance = serializer.save()
        if not instance.content:
            instance.content = instance.title
            ##


class ProductDestroyAPIView(generics.DestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = PostProductSerializer
    lookup_field = 'pk'

    def perform_destroy(self, instance):
        # instance
        super().perform_destroy(instance)


@api_view(['GET','POST', 'DELETE', 'PUT'])
def product_alt_view(request,pk=None, *args, **kwargs):
    if request.method == 'GET':
        # print(pk)
        if pk is not None:
            instance = get_object_or_404(Product, pk=pk)
            data = GetProductSerializer(instance).data
            return Response(data)
        else:
            quertset = Product.objects.all()
            data = GetProductSerializer(quertset, many=True).data
            return Response(data)

    if request.method == 'POST':
        serializer = PostProductSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            title = serializer.validated_data.get('title')
            content = serializer.validated_data.get('content') or None
            if content is None:
                content = title
            instance = serializer.save(content=content)
            serialized_data = PostProductSerializer(instance).data
            print(serialized_data)
            # print(serializer.validated_data)
            # data = serializer.validated_data
            return Response(serialized_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        if pk is not None:
            instance = get_object_or_404(Product, pk=pk)
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'PUT':
        if pk is not None:
            instance = get_object_or_404(Product, pk=pk)
            serializer = PostProductSerializer(instance, data=request.data,
                                               partial=True)  # partial=True for partial updates
            if serializer.is_valid():
                instance = serializer.save()
                serialized_data = PostProductSerializer(instance).data
                print(serialized_data)
                return Response(serialized_data, status=status.HTTP_200_OK)
            else:
                # Print the errors to help debug the issue
                print("errors")
                print(serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#Also explore mixins generic views
# class ProductMixinView(
#     mixins.CreateModelMixin,
#     mixins.ListModelMixin,
#     mixins.RetrieveModelMixin,
#     generics.GenericAPIView
#     ):
#     pass