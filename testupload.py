import requests
import json
from requests.auth import HTTPDigestAuth

option = 2

if option == 1:
	payload = {'template': 'Summary', 'data': 'testy'}

	url = "http://localhost:3000/api/v1.0/uploadData"
	headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
	print requests.post(url, data=json.dumps(payload), headers=headers, auth=('Gokz', 'godie'))
elif option == 2:
	url = "http://localhost:3000/api/v1.0/fileupload"
	payload = {'file': open('./payload.zip', 'rb')}
	r = requests.post(url, files=payload)


