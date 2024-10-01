from django.urls import path
from .views import MintNFTView, GetCsrfTokenView, TransferNFTView

urlpatterns = [
    path('get_csrf_token/', GetCsrfTokenView.as_view(), name='get_csrf_token'),
    path('mint/', MintNFTView.as_view(), name='mint_nft'),
    path('transfer/', TransferNFTView.as_view(), name='transfer_nft'),
]
