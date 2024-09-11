# @api_view(['POST'])
# def api_home(request):
#     """
#     DRF API View
#     """
#     serializer = PostProductSerializer(data=request.data)
   
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)  # Return the serialized data
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)