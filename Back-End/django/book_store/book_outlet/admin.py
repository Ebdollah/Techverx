from django.contrib import admin
from .models import Address, Author, Country
# Register your models here.

admin.site.register(Address)
admin.site.register(Author)
admin.site.register(Country)
# admin.site.register(Book)