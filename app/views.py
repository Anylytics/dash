from flask import render_template, flash, abort, request, jsonify, redirect, url_for, session, g
from flask.ext.login import login_user, logout_user, current_user, login_required
from app import app, db, lm, bcrypt
from .forms import LoginForm
from .models import User, Action, Data, Template
from datetime import datetime
import json



@app.route('/login', methods=['GET', 'POST'])
def login():
	if g.user is not None and g.user.is_authenticated():
		return redirect(url_for('home_page'))
	form = LoginForm()
	if form.validate_on_submit():
		user = User.query.filter_by(username=form.userid.data).first()
		if user is None:
			flash('Username or Password is invalid' , 'error')
		else:
			if bcrypt.check_password_hash(user.password, form.password.data):
				user.authenticated = True
				action = Action(action="Log In", timestamp=datetime.utcnow(), user=user)
				db.session.add(action)
				db.session.commit()
				login_user(user, remember=True)
				return redirect(url_for("home_page"))
	return render_template('login.html', name='login',form=form, providers=app.config['OPENID_PROVIDERS'])


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
	numRows = request.json.get('rows', 1)
	#First get the associated template
	template = Template.query.filter_by(name=request.json['template']).first()
	if template is None:
		abort(404)
	#From the template get the data requested
	data = template.data.order_by(Data.id.desc()).limit(numRows).all()
	response = []
	for row in data:
		response.append(json.loads(row.data))
	return jsonify(response = response)


@app.route('/api/v1.0/uploadData', methods=['POST'])
def upload_data():
    if not request.json or not 'template' in request.json or not 'data' in request.json:
        abort(400)
    template = Template.query.filter_by(name=request.json['template']).first()
    if template is None:
    	abort(404)
    data = Data(data = request.json['data'], template= template)
    db.session.add(data)
    db.session.commit()
    return jsonify({'Data': request.json['data']}), 201