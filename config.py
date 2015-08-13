WTF_CSRF_ENABLED = True
SECRET_KEY = 'you-will-never-guess'

import os
basedir = os.path.abspath(os.path.dirname(__file__))

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'dash.db')
SQLALCHEMY_MIGRATE_REPO = os.path.join(basedir, 'db_repository')
UPLOAD_FOLDER = '/Users/guiltyspark/Anylytics/dash/fileuploads'
ALLOWED_EXTENSIONS = set(['zip'])