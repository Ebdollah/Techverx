import requests

# endpoint = 'https://httpbin.org/anything'
endpoint = 'http://localhost:8000/api/'  #make sure django is running

# get_data = requests.get(endpoint)  #http request
# get_data = requests.get(endpoint, params={"abc": 123}, json={"query" : "Hello World"})  #http request
# post_data = requests.post(endpoint, json={"id": 1})  # POST request
# post_data = requests.post(endpoint, json={"name": 'abdullah'})  # POST request
post_data = requests.post(endpoint, json={'title': 'Hello Pakistan', 'content': 'hellllllllloooooo','price':'100' } )  # POST request
# post_data = requests.post(endpoint, json={"title": 'Hello World'})  # POST request
# print(get_data.json())
print(post_data.json())

# print(get_data.json())
# print(get_data.status_code)
print(post_data.status_code)

# print(get_data.text)

# {
#   "args": {},
#   "data": "",
#   "files": {},
#   "form": {},
#   "headers": {
#     "Accept": "*/*",
#     "Accept-Encoding": "gzip, deflate",
#     "Host": "httpbin.org",
#     "User-Agent": "python-requests/2.32.3",
#     "X-Amzn-Trace-Id": "Root=1-66e154a8-7e2856735f0b6dad0b869f8c"
#   },
#   "json": null,
#   "method": "GET",
#   "origin": "103.8.115.242",
#   "url": "https://httpbin.org/anything"
# }
