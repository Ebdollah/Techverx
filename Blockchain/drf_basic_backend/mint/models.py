from django.db import models

class NFTListing(models.Model):
    token_id = models.IntegerField(unique=True)  # NFT token ID
    seller_address = models.CharField(max_length=42)  # Seller's Ethereum address
    sale_price = models.DecimalField(max_digits=20, decimal_places=18)  # Price in ETH
    is_available = models.BooleanField(default=True)  # Availability status

    def __str__(self):
        return f"NFTListing(token_id={self.token_id}, seller_address={self.seller_address}, sale_price={self.sale_price}, is_available={self.is_available})"
