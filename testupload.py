import requests
import json
from requests.auth import HTTPDigestAuth

payload = {'template': 'Summary', 'data': 'testy'}

url = "http://localhost:3000/api/v1.0/uploadData"
headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
print requests.post(url, data=json.dumps(payload), headers=headers, auth=('Gokz', 'godie'))

