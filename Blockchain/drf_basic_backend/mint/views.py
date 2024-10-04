from .blockchain import mint_nft, buy_nft, approve_nft
from .models import NFTListing
from .serializers import NFTListingSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .blockchain import transfer_nft
from web3 import Web3
from .blockchain import contract





@method_decorator(csrf_exempt, name='dispatch')
class GetCsrfTokenView(APIView):
    def get(self, request):
        csrf_token = request.COOKIES.get('csrftoken')
        print(csrf_exempt)
        return JsonResponse({'csrfToken': csrf_token})

# Ensure that the CSRF cookie is sent when visiting the page
# @method_decorator(csrf_exempt, name='dispatch')

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .blockchain import mint_nft, list_nft_for_sale
import ipfsapi

class MintNFTView(APIView):
    def post(self, request):
        recipient_address = request.data.get('recipient_address')
        price = request.data.get('price')
        image = request.FILES.get('image')

        if not all([recipient_address, price, image]):
            return Response({
                'error': 'Recipient address, price, and image are required'
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Upload image to IPFS
            ipfs = ipfsapi.Client('127.0.0.1', 5001)
            image_hash = ipfs.add(image.read())['Hash']
            
            # Create metadata
            metadata = {
                "name": f"NFT #{image_hash[:8]}",
                "description": request.data.get('description', ''),
                "image": f"ipfs://{image_hash}"
            }
            
            # Upload metadata to IPFS
            metadata_hash = ipfs.add_json(metadata)
            token_uri = f"ipfs://{metadata_hash}"
            
            # Mint NFT
            tx_receipt, token_id, owner_address = mint_nft(
                recipient_address,
                token_uri,
                float(price)
            )

            return Response({
                'transaction_hash': tx_receipt['transactionHash'].hex(),
                'token_id': token_id,
                'owner_address': owner_address,
                'token_uri': token_uri
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ListNFTForSaleView(APIView):
    def post(self, request):
        token_id = request.data.get('token_id')
        price = request.data.get('price')
        seller_address = request.data.get('seller_address')

        if not all([token_id, price, seller_address]):
            return Response({
                'error': 'Token ID, price, and seller address are required'
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            tx_receipt = list_nft_for_sale(int(token_id), float(price), seller_address)
            
            return Response({
                'transaction_hash': tx_receipt['transactionHash'].hex(),
                'status': 'success'
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class VerifyOwnershipView(APIView):
    def get(self, request, token_id):
        try:
            # Call the smart contract to get the owner of the token
            owner_address = contract.functions.ownerOf(token_id).call()
            return Response({'tokenId': token_id, 'ownerAddress': owner_address}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@method_decorator(ensure_csrf_cookie, name='dispatch')
class TransferNFTView(APIView):
    def post(self, request):
        from_address = request.data.get('from_address')
        to_address = request.data.get('to_address')
        token_id = request.data.get('token_id')

        if not from_address or not to_address or not token_id:
            return Response({'error': 'from_address, to_address, and token_id are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Call the blockchain transfer function
        try:
            tx_receipt = transfer_nft(from_address, to_address, int(token_id))
            
            # Serialize the transaction receipt
            serialized_receipt = {
                'transactionHash': tx_receipt['transactionHash'].hex(),
                'status': tx_receipt['status'],
                'gasUsed': tx_receipt['gasUsed'],
            }
            return Response({'transaction_receipt': serialized_receipt}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ListAvailableNFTsView(APIView):
    def get(self, request):
        try:
            # Fetch all available NFTs
            listings = NFTListing.objects.filter(is_available=True)
            serializer = NFTListingSerializer(listings, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Add this view in your views.py
class ApproveNFTView(APIView):
    def post(self, request):
        seller_address = request.data.get('seller_address')
        buyer_address = request.data.get('buyer_address')
        token_id = request.data.get('token_id')

        if not seller_address or not buyer_address or not token_id:
            return Response({'error': 'seller_address, buyer_address, and token_id are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            tx_receipt = approve_nft(seller_address, buyer_address, int(token_id))  # Pass seller_address here
            serialized_receipt = {
                'transactionHash': tx_receipt['transactionHash'].hex(),
                'status': tx_receipt['status'],
                'gasUsed': tx_receipt['gasUsed'],
            }
            return Response({'transaction_receipt': serialized_receipt}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




# views.py
@method_decorator(csrf_exempt, name='dispatch')
class BuyNFTView(APIView):
    def post(self, request):
        buyer_address = request.data.get('buyer_address')
        token_id = request.data.get('token_id')

        if not buyer_address or not token_id:
            return Response({'error': 'buyer_address and token_id are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            tx_receipt = buy_nft(buyer_address, int(token_id))
            # Serialize the transaction receipt
            serialized_receipt = {
                'transactionHash': tx_receipt['transactionHash'].hex(),
                'status': tx_receipt['status'],
                'gasUsed': tx_receipt['gasUsed'],
            }
            return Response({'transaction_receipt': serialized_receipt}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

