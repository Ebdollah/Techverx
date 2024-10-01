from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .blockchain import mint_nft
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .blockchain import transfer_nft



@method_decorator(csrf_exempt, name='dispatch')
class GetCsrfTokenView(APIView):
    def get(self, request):
        csrf_token = request.COOKIES.get('csrftoken')
        print(csrf_exempt)
        return JsonResponse({'csrfToken': csrf_token})

# Ensure that the CSRF cookie is sent when visiting the page
# @method_decorator(csrf_exempt, name='dispatch')
@method_decorator(ensure_csrf_cookie, name='dispatch')
class MintNFTView(APIView):
    def post(self, request):
        recipient_address = request.data.get('recipient_address')
        if not recipient_address:
            return Response({'error': 'Recipient address is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Call the blockchain minting function
        try:
            tx_receipt = mint_nft(recipient_address)
            print("Transaction Receipt:", tx_receipt)
            # logs = tx_receipt['logs']
            # token_id = w3.toInt(hexstr=logs[0]['topics'][3].hex())
            
            # Serialize only necessary fields from the tx_receipt
            serialized_receipt = {
                'transactionHash': tx_receipt['transactionHash'].hex(),  # Convert bytes to hex string
                # 'logs' : tx_receipt['logs'].hex(),
                'status': tx_receipt['status'],
                'gasUsed': tx_receipt['gasUsed'],
                # Add more fields as needed
            }
            return Response({'transaction_receipt': serialized_receipt}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@method_decorator(ensure_csrf_cookie, name='dispatch')
class TransferNFTView(APIView):
    def post(self, request):
        from_address = request.data.get('from_address')
        to_address = request.data.get('to_address')
        token_id = request.data.get('token_id')

        if not from_address or not to_address or not token_id:
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

        # Call the blockchain transfer function
        try:
            tx_receipt = transfer_nft(from_address, to_address, token_id)
            return Response({'transaction_receipt': tx_receipt}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
