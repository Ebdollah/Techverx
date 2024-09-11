import requests

# endpoint = 'https://httpbin.org/anything'
endpoint = 'http://localhost:8000/api/products/1'  #make sure django is running

get_data = requests.get(endpoint)  #http request
# get_data = requests.get(endpoint, params={"abc": 123}, json={"query" : "Hello World"})  #http request

print(get_data.json())
