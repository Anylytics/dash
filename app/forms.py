from flask.ext.wtf import Form
from wtforms.widgets import TextArea, Select
from wtforms import StringField, BooleanField, PasswordField, IntegerField, SelectField
from wtforms.validators import DataRequired, Optional

class LoginForm(Form):
	userid = StringField('userid',validators=[DataRequired()])
	password = PasswordField('password',validators=[DataRequired()])
	remember_me = BooleanField('remember_me',default=False)

class UploadForm(Form):
	templateid = SelectField('templateid',coerce=int, validators=[DataRequired()])
	fileid = IntegerField('fileid', validators=[Optional()])
	data =StringField('data', widget=TextArea(), validators=[DataRequired()])

class CreateUserForm(Form):
	name = StringField('name',validators=[DataRequired()])
	username = StringField('userid',validators=[DataRequired()])
	password = PasswordField('password',validators=[DataRequired()])
	email = StringField('email',validators=[DataRequired()])