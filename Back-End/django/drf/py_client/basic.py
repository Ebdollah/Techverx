import requests

# endpoint = 'https://httpbin.org/anything'
endpoint = 'http://localhost:8000/'  #make sure django is running

# get_data = requests.get(endpoint)  #http request
get_data = requests.get(endpoint, json={"query" : "Hello World"})  #http request

# print(get_data.text)
print(get_data.status_code)
# print(get_data.json())

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
