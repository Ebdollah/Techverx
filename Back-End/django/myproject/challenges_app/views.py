from django.shortcuts import render, HttpResponse

# Create your views here.

def jan(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def feb(request):
    return HttpResponse("Hello, world. Feb month")

def mar(request):
    return HttpResponse("Hello, March")