import requests

endpoint = 'http://localhost:8000/api/products/update/2'


data = {'title': 'Updated title',
       }

post_data = requests.put(endpoint,
                          json= data)  # POST request
# post_data = requests.post(endpoint, json={"title": 'Hello World'})  # POST request
# print(get_data.json())
print(post_data.json())