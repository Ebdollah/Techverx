from django.db import models

# Create your models here.

class Product(models.Model):
    title = models.CharField(max_length=120)
    content = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=15, decimal_places=2, default=99.99)

    def __str__(self):
        return (f"{self.title} has price {self.price}, its description is {self.content} and currently"
                f"sale is {self.sale_price} and you can get discount {self.get_discount()}")

    @property
    def sale_price(self):
        return "%.2f" %(float(self.price)*0.5)

    def get_discount(self):
        return "%.2f" %(float(self.price)*0.2)