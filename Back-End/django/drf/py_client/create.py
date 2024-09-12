import requests

endpoint = 'http://localhost:8000/api/products/create/'  #make sure django is running

# get_data = requests.get(endpoint)  #http request
# get_data = requests.get(endpoint, params={"abc": 123}, json={"query" : "Hello World"})  #http request
# post_data = requests.post(endpoint, json={"id": 1})  # POST request
# post_data = requests.post(endpoint, json={"name": 'abdullah'})  # POST request
data = {'title': 'This field entered',
        'content': 'Able to save create data',
        'price':'10000' }

post_data = requests.post(endpoint,
                          json= data)  # POST request
# post_data = requests.post(endpoint, json={"title": 'Hello World'})  # POST request
# print(get_data.json())
print(post_data.json())
