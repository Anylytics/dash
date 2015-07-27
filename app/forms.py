from flask.ext.wtf import Form
from wtforms.widgets import TextArea, Select
from wtforms import StringField, BooleanField, PasswordField, IntegerField, SelectField
from wtforms.validators import DataRequired

class LoginForm(Form):
	userid = StringField('userid',validators=[DataRequired()])
	password = PasswordField('password',validators=[DataRequired()])
	remember_me = BooleanField('remember_me',default=False)

class UploadForm(Form):
	templateid = SelectField('templateid',coerce=int, validators=[DataRequired()])
	data =StringField('data', widget=TextArea(), validators=[DataRequired()])