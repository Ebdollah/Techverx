from django.urls import path
from .views import MintNFTView, GetCsrfTokenView

urlpatterns = [
    path('get_csrf_token/', GetCsrfTokenView.as_view(), name='get_csrf_token'),
    path('mint/', MintNFTView.as_view(), name='mint_nft'),
]
