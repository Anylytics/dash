from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.bcrypt import Bcrypt
from flask.ext.httpauth import HTTPBasicAuth

app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
auth = HTTPBasicAuth()

import os
from flask.ext.login import LoginManager
#from flask.ext.openid import OpenID
from config import basedir

lm = LoginManager()
lm.init_app(app)
lm.login_view = 'login'
#oid = OpenID(app,os.path.join(basedir, 'tmp'))

from app import views, api, models


#if __name__ == '__main__':
#    app.run(host='0.0.0.0', port=3000, debug='True')