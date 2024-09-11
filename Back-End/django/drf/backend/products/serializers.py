from rest_framework import serializers
from products.models import Product

class ProductSerializer(serializers.ModelSerializer):
    my_discount = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'title',
            'content',
            'price',
            'sale_price',
            'my_discount'
        ]


    def get_my_discount(self, obj):
        print(obj.id)
        return obj.get_discount()
