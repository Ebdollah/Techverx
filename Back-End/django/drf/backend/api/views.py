from django.shortcuts import render, get_object_or_404, HttpResponse # type: ignore
from django.http import JsonResponse, HttpResponse #type: ignore
from products.models import Product
from django.forms.models import model_to_dict
import json  # to parse JSON data
from rest_framework.response import Response
from rest_framework.decorators import api_view
from products.serializers import ProductSerializer

# Create your views here.
@api_view(['GET'])
def api_home(request):
    """
    DRF API View
    """
    instance = Product.objects.all().order_by('?').first()
    print(instance)
    data = {}
    if instance:
        # data = model_to_dict(instance, fields=['id', 'title', 'price'])
        data = ProductSerializer(instance).data
        # data['id'] = model_data.id
        # data['title'] = model_data.title
        # data['content'] = model_data.content
        # data['price'] = model_data.price
    print(data)
    return Response(data)

def index(request):
    pass

# def api_dummy(request, *args, **kwargs):
#     #it is django HttpRequest
#     print(request.body)
#     #It doesn't process or return any of the incoming request parameters or JSON data yet.
#     return JsonResponse({
#         "message" : "Hi, your django json response"
#     })


# def api_dummy(request, *args, **kwargs):
#     # Get the 'abc' query parameter from the URL (still works for GET and POST)
#     query_params = request.GET.get('abc')  # '123'
#
#     # Parse the JSON body for POST requests
#     try:
#         body_data = json.loads(request.body)
#     except json.JSONDecodeError:
#         body_data = {}
#
#     # Access the 'query' key in the parsed JSON body
#     query = body_data.get('query')
#
#     # Return both the query parameter and JSON data in the response
#     return JsonResponse({
#         "message": "Hi, your django json response",
#         "abc": query_params,  # '123'
#         "query": query  # 'Hello World'
#     })


#this is a naive way
# def api_dummy(request, *args, **kwargs):
#     body = request.body
#     body_data = {}
#     # Parse the JSON body for POST requests
#     try:
#         body_data = json.loads(body)
#     except json.JSONDecodeError:
#         pass
#     print(body_data)
#
#     header_data = request.headers
#
#     print(header_data)
#
#     # Return both the query parameter and JSON data in the response
#     return JsonResponse({
#         "message": "Hi, your django json response",
#     })

def api_dummy(request, *args, **kwargs):
    print(request.GET)
    # print(request.body)
    print(request.headers)

    body = request.body
    # print(body)
    data = {}
    try:
        data = json.loads(body)
    except:
        pass
    print(data)

    data['params'] = dict(request.GET)
    data['headers'] = dict(request.headers)
    data['content-type'] = request.content_type

    return JsonResponse(data)
