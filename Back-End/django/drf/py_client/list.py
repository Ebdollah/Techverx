import requests

endpoint = 'http://localhost:8000/api/products/list'

post_data = requests.get(endpoint)
print(post_data.json())