from app import app
from flask import render_template, abort, request, jsonify, redirect, url_for


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
	error = None
	if request.method == "POST": #TODO switch out for DB of users
		if request.form['username'] != 'admin' or request.form['password'] != 'admin':
			error = 'Invalid Credentials. Please try again.'
		else:
			return redirect(url_for('home_page'))#TODO pass auth token
	return render_template('login.html', error=error)

@app.route('/logout')
def logout():
	logout_user()
	return redirect(url_for('login'))
