from django.shortcuts import render


def index(request):
    return render(request, "converse/index.html")

def room(request, room_name):
    return render(request, "converse/room.html", {"room_name": room_name})