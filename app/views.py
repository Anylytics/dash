from flask import render_template, flash, abort, request, jsonify, redirect, url_for, session, g, send_from_directory
from flask.ext.login import login_user, logout_user, current_user, login_required
from app import app, db, lm, bcrypt, auth
from .forms import LoginForm, UploadForm
from .models import User, Action, Data, Template, Groups, File
from datetime import datetime
import json
from functools import wraps
from sqlalchemy.exc import IntegrityError
from werkzeug import secure_filename
import os
import time

def allowed_file(filename):
	return '.' in filename and \
		   filename.rsplit('.', 1)[1] in app.config['ALLOWED_EXTENSIONS']

def is_json(myjson):
  try:
	json_object = json.loads(myjson)
  except ValueError, e:
	return False
  return True

@auth.verify_password
def verify_password(username, password):
	user = User.query.filter_by(username=username, active = True).first()
	if not user: 
		return False
	if bcrypt.check_password_hash(user.password.encode('utf-8'), password) == False:
		return False
	action = Action(action="API Log In", timestamp=datetime.utcnow(), user=user)
	db.session.add(action)
	db.session.commit()
	g.user = user
	return True

def g_login_required(group="ANY"):
	def wrapper(fn):
		@wraps(fn)
		def decorated_view(*args, **kwargs):
			if not current_user.is_authenticated():
			   return lm.unauthorized()
			group_object = Groups.query.filter_by(groupName=group, active = True).first()
			if ( (group_object not in current_user.groups) and (group != "ANY")):
				return lm.unauthorized()      
			return fn(*args, **kwargs)
		return decorated_view
	return wrapper


@app.route('/login', methods=['GET', 'POST'])
def login():
	if g.user is not None and g.user.is_authenticated():
		return redirect(url_for('home_page'))
	form = LoginForm()
	if form.validate_on_submit():
		user = User.query.filter_by(username=form.userid.data, active = True).first()
		if user is None:
			flash('Username or Password is invalid' , 'error')
		else:
			if bcrypt.check_password_hash(user.password.encode('utf-8'), form.password.data):
				user.authenticated = True
				action = Action(action="Log In", timestamp=datetime.utcnow(), user=user)
				db.session.add(action)
				db.session.commit()
				login_user(user, remember=True)
				return redirect(url_for("home_page"))
	return render_template('login.html', name='login',form=form)


@app.route('/index')
@app.route('/')
@login_required
def home_page():
	user=g.user
	updates = [  # fake array of updates
		{ 
			'user': {'nickname': 'Nabil', 'initial':'N'}, 
			'status': 'New report posted' 
		},
		{ 
			'user': {'nickname': 'Gokul', 'initial':'G'}, 
			'status': 'Data uploaded' 
		},
		{ 
			'user': {'nickname': 'Nitin', 'initial':'N'}, 
			'status': 'New analysis available' 
		}
	]
	return render_template('index.html', name='home', user=user, updates=updates)


@app.route('/reports')
@login_required
def reports_page():
	user=g.user
	action = Action(action = "Checked reports", timestamp = datetime.utcnow(),user = user)
	db.session.add(action)
	db.session.commit()
	return render_template('reports.html', name='reports', user=user)

@app.route('/admin-upload', methods=['GET', 'POST'])
@g_login_required(group=app.config['ADMIN_GROUP'])
def admin_upload_page():
	user=g.user
	form = UploadForm()
	templates = set()

	for group in user.groups:
		#Get all the templates in this group
		for template in group.Templates:
			templates.add(template)
	form.templateid.choices = [[t.id, t.name] for t in templates]

	if form.validate_on_submit():
		action = Action(action = "Uploaded Data via Admin Panel", timestamp = datetime.utcnow(), user = user)
		db.session.add(action)
		#Validate that the data is json
		if is_json(form.data.data) == False:
			flash("Invalid JSON submitted")
		else:
			#Find the template the user has selected
			template_id = form.templateid.data
			file_id = form.fileid.data
			file_selected = File.query.filter_by(id=file_id).first()
			template = Template.query.filter_by(id=template_id, active=True).first()
			if template is None:
				flash('Could not find template' , 'success')
			elif file_selected is None:
				flash('Could not find associated file', 'success')
			else:
				data = Data(data = form.data.data, template = template, file_id = file_id)
				db.session.add(data)
				flash('Successfully Uploaded Data to '+template.name)
		db.session.commit()
		print Data.query.order_by(Data.id.desc()).first().id
	else:
		action = Action(action = "Accessed Admin Upload Panel", timestamp = datetime.utcnow(), user = user)
		db.session.add(action)
		db.session.commit()
	return render_template('admin-upload.html', name='admin', user=user, templates=list(templates), form=form)

@app.route('/settings')
@login_required
def settings_page():
	user=g.user
	return render_template('settings.html', name='settings', user=user)

@app.route('/logout')
def logout():
	logout_user()
	return redirect(url_for('login'))

@app.before_request
def before_request():
	g.user = current_user

@lm.user_loader
def load_user(id):
	return User.query.get(int(id))

@app.route('/api/v1.0/getData', methods=['POST'])
def get_data():
	print request.json
	if not request.json or not 'template' in request.json: 
		abort(400)
	#First get the associated template
	template = Template.query.filter_by(name=request.json['template'], active = True).first()
	if template is None:
		abort(404)
	#From the template get the data requested
	data = template.data.filter_by(active=True).order_by(Data.id.desc()).first()
	response = []
	response.append(json.loads(data.data))
	file_selected = File.query.filter_by(id=data.file_id).first()
	if file_selected is not None:
		response.append(data.file_id)
		response.append(file_selected.name)
	return jsonify(response = response)
	

def upload_data_worker(user, template, data, file_id=None):
	if template is None or user is None or data is None:
		return 400
	#Grab all the templates the user can upload to 
	templates = set()
	for group in user.groups:
		#Get all the templates in this group
		for template in group.Templates:
			templates.add(template)
	#Check if the selected template is in the set
	if template not in templates:
		return 401
	#Upload the data to the template
	data = Data(data = data, template= template, file_id = file_id)
	db.session.add(data)
	db.session.commit()
	return jsonify({'Data': request.json['data']})

@app.route('/api/v1.0/uploadData', methods=['POST'])
@auth.login_required
def upload_data_endpoint():
	user = g.user
	if not request.json or not 'template' in request.json or not 'data' in request.json:
		abort(400)
	template = Template.query.filter_by(name=request.json['template'], active = True).first()
	retval = upload_data_worker(user=user,template=template, data=request.json['data'], file_id = request.json['file_id'])
	if retval is int:
		abort(retval)
	else:
		return retval, 201


@app.route('/api/v1.0/fileUpload', methods=['GET', 'POST'])
@auth.login_required
def upload_file():
	if request.method == 'POST':
		file = request.files['file']
		if file and allowed_file(file.filename):
			filename = secure_filename(file.filename)+str(time.time())
			file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
			#action = Action(action = "Uploaded File via API", timestamp = datetime.utcnow(), user = user)
			file_db = File(filename=filename, name=file.filename)
			#db.session.add(action)
			db.session.add(file_db)
			db.session.commit()
			return jsonify({'file_id': file_db.id})
	#TODO: This is debug code, perhaps we should remove it? 
	return '''
	<!doctype html>
	<title>Upload new File</title>
	<h1>Upload new File</h1>
	<form action="" method=post enctype=multipart/form-data>
	  <p><input type=file name=file>
	  	 <input type=text name=template>
		 <input type=submit value=Upload>
	</form>
	'''
			
@app.route('/api/v1.0/createGroup', methods=['POST'])
@auth.login_required
def api_create_group():
	user = g.user
	#Get the Admin group
	admin_group = Groups.query.filter_by(groupName=app.config['ADMIN_GROUP'], active = True).first()
	if admin_group is not None and admin_group in user.groups:
		if not request.json:
			abort(400)
		if 'groupname' not in request.json:
			abort(400)
		groupname = request.json['groupname']
		action = Action(action = "Admin Creating Group", timestamp = datetime.utcnow(), user = user)
		db.session.add(action)
		return create_group(groupname)
	else:
		abort(401)

def create_group(groupname):
	group = Groups(groupName = groupname)
	db.session.add(group)
	try:
		db.session.commit()
		return "SUCCESS", 201
	except:
		db.session.rollback()
		return "Integrity Error: Duplicate Group", 409


@app.route('/api/v1.0/createUser', methods=['POST'])
@auth.login_required
def api_create_user():
	user = g.user
	#Get the Admin group
	admin_group = Groups.query.filter_by(groupName=app.config['ADMIN_GROUP'], active = True).first()
	if admin_group is not None and admin_group in user.groups:
		if not request.json:
			abort(400)
		if 'username' not in request.json or 'email' not in request.json or 'password' not in request.json:
			abort(400)
		username=request.json['username']
		email=request.json['email']
		password=request.json['password']
		action = Action(action = "Admin Creating User", timestamp = datetime.utcnow(), user = user)
		db.session.add(action)
		return create_user(username, email, password)
	else:
		abort(401)

def create_user(username, email, password):
	user = User(username=username, email=email, password=bcrypt.generate_password_hash(password))
	db.session.add(user)
	try:
		db.session.commit()
		return "SUCCESS", 201
	except IntegrityError:
		db.session.rollback()
		return "Integrity Error: Duplicate User", 409



@app.route('/api/v1.0/getupload/<file_id>')
def uploaded_file(file_id):
	file_selected = File.query.filter_by(id=file_id).first()
	if file_selected is not None:
		return send_from_directory(app.config['UPLOAD_FOLDER'], file_selected.filename)
	else:
		abort(201)


