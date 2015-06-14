from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)

from app import views, models


#if __name__ == '__main__':
#    app.run(host='0.0.0.0', port=3000, debug='True')