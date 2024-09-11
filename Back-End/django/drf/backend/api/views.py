from django.shortcuts import render, get_object_or_404, HttpResponse # type: ignore

# Create your views here.

def index(request):
    return HttpResponse('Hello')

from django.http import JsonResponse #type: ignore

# def api_home(request, *args, **kwargs):
#     #it is django HttpRequest
#     print(request.body)
#     #It doesn't process or return any of the incoming request parameters or JSON data yet.
#     return JsonResponse({
#         "message" : "Hi, your django json response"
#     })

import json  # to parse JSON data

# def api_home(request, *args, **kwargs):
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
# def api_home(request, *args, **kwargs):
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

def api_home(request, *args, **kwargs):
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
