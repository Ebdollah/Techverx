from django.db import models # type: ignore
from django.core.validators import MinValueValidator, MaxValueValidator # type: ignore
from django.urls import reverse # type: ignore
from django.utils.text import slugify # type: ignore

# Create your models here.

class Address(models.Model):
    street = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=100)

    def __str__(self):
        return self.street

class Author(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    address = models.OneToOneField(Address, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.first_name

class Country(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    def __str__(self):
        return self.name

# class Book(models.Model):
#     title = models.CharField(max_length=10)
#     rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
#     # author = models.CharField(null=True, max_length=100)
#     author = models.ForeignKey(Author, on_delete=models.CASCADE, null=True)
#     is_bestselling = models.BooleanField(default=False)
#     published_countries = models.ManyToManyField(Country, blank=True)
#     # slug = models.SlugField(default='', null=False)
#
#     def __str__(self):
#         return f"{self.title} {self.rating} {self.author} {self.is_bestselling}"
#         # return f"\n{self.title} has {self.rating} ratings, it's author is {self.author} and currently bestselling {self.is_bestselling}"
#
#     def save(self, *args, **kwargs):
#         self.slug = slugify(self.title)
#         super().save(*args, **kwargs)
#
#     def get_absolute_url(self):
#         return reverse('book-detail', args=[self.id])




