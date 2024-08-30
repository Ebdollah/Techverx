from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.urls import reverse

# Create your models here.

class Book(models.Model):
    title = models.CharField(max_length=10)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    author = models.CharField(null=True, max_length=100)
    is_bestselling = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title} {self.rating} {self.author} {self.is_bestselling}"
        # return f"\n{self.title} has {self.rating} ratings, it's author is {self.author} and currently bestselling {self.is_bestselling}"

    def get_absolute_url(self):
        return reverse('book-detail', args=[self.id])




