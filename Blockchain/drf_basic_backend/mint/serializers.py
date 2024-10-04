from .models import NFTListing
from rest_framework import serializers

# Serializer for NFTListing
class NFTListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = NFTListing
        fields = ['token_id', 'seller_address', 'sale_price', 'is_available']