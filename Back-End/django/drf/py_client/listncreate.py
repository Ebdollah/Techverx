import requests

endpoint = 'http://localhost:8000/api/products/'

data = {'title': 'This field entered',
        'content': 'Able to save create data',
        'price':'10000' }

# post_data = requests.post(endpoint,
#                           json= data)

post_data = requests.get(endpoint)
print(post_data.json())