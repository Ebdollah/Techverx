from django.contrib import admin
# from models import Room, Message
from . import models
# Register your models here.


admin.site.register(models.Room)
admin.site.register(models.Message)
