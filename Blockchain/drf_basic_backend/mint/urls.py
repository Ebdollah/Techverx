from django.urls import path
from .views import ( 
        MintNFTView, GetCsrfTokenView, TransferNFTView, VerifyOwnershipView, ListAvailableNFTsView, BuyNFTView,
        ApproveNFTView
)

urlpatterns = [
    path('get_csrf_token/', GetCsrfTokenView.as_view(), name='get_csrf_token'),
    path('mint/', MintNFTView.as_view(), name='mint_nft'),
    path('transfer/', TransferNFTView.as_view(), name='transfer_nft'),
    path('verify_ownership/<int:token_id>/', VerifyOwnershipView.as_view(), name='verify_ownership'),
    path('list/', ListAvailableNFTsView.as_view(), name='list_nft'),  # New URL for listing
    path('buy/', BuyNFTView.as_view(), name='buy_nft'), 
    path('approve/', ApproveNFTView.as_view(), name='approve_nft'),

]
