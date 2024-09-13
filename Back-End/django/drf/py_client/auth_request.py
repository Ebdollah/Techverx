
import requests
from getpass import getpass

auth_endpoint = "http://localhost:8000/api/auth/"
password = getpass()

auth_response = requests.post(auth_endpoint, json={"username": 'drf', "password": password})

if auth_response.status_code == 200:
    token = auth_response.json()['token']
    headers = {
        "Authorization": f"Token {token}"
    }
    endpoint = "http://localhost:8000/api/products/"

    get_response = requests.get(endpoint, headers=headers)
    if get_response.status_code == 200:
        print(get_response.json())