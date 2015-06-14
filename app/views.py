from flask import render_template, flash, abort, request, jsonify, redirect, url_for
from app import app
from .forms import LoginForm


@app.route('/index')
@app.route('/')
def home_page():
	return render_template('index.html', name='home')


@app.route('/reports')
def reports_page():
	return render_template('reports.html', name='reports')


@app.route('/settings')
def settings_page():
	return render_template('settings.html', name='settings')


@app.route('/login', methods=['GET', 'POST'])
def login():
	form = LoginForm()
	if form.validate_on_submit():
		flash('Login requested for OpenID="%s", remember_me=%s' %
			(form.openid.data, str(form.remember_me.data)))
		return redirect('/index')
	return render_template('login.html', name='login',form=form, providers=app.config['OPENID_PROVIDERS'])

@app.route('/logout')
def logout():
	logout_user()
	return redirect(url_for('login'))

@app.route('/test')
def test():
	user={'nickname':'Nabil'}
	updates = [  # fake array of posts
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
	return render_template('index.html', user=user, updates=updates)