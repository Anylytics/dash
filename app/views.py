from flask import render_template, flash, abort, request, jsonify, redirect, url_for, session, g
from flask.ext.login import login_user, logout_user, current_user, login_required
from app import app, db, lm, bcrypt
from .forms import LoginForm
from .models import User



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
				db.session.add(user)
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

"""
@oid.after_login
def after_login(resp):
	if resp.email is None or resp.email == "":
		flash('Invalid login. Please try again.')
		return redirect(url_for('login'))
	user = User.query.filter_by(email=resp.email).first()
	if user is None:
		nickname = resp.nickname
		if nickname is None or nickname =="":
			nickname = resp.email.split('@')[0]
		user = User(nickname=nickname, email=resp.email)
		db.session.add(user)
		db.session.commit()
	remember_me = False
	if 'remember_me' in session:
		remember_me = session['remember_me']
		session.pop('remember_me', None)
	login_user(user, remember = remember_me)
	return redirect(request.args.get('next') or url_for('home_page'))  #will return user to originally requested page, otherwise, home
	"""