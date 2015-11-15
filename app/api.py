from flask import render_template, flash, abort, request, jsonify, redirect, url_for, session, g, send_from_directory
from flask.ext.login import login_user, logout_user, current_user, login_required
from app import app, db, lm, bcrypt, auth
from .forms import LoginForm, UploadForm, CreateUserForm
from .models import User, Action, Data, Template, Groups, File
from datetime import datetime
import json
from functools import wraps
from sqlalchemy.exc import IntegrityError
from werkzeug import secure_filename
import os
import time


def isadmin(user):
	admin_group = Groups.query.filter_by(groupName=app.config['ADMIN_GROUP'], active = True).first()
	if admin_group is not None and admin_group in user.groups:
		return True
	return False

@app.route('/api/v1.0/createGroup', methods=['POST'])
@auth.login_required
def api_create_group():
	user = g.user
	if isadmin(user):
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
	if isadmin(user):
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

@app.route('/api/v1.0/joinGroup', methods=['POST'])
@auth.login_required
def api_join_group():
	user = g.user
	if isadmin(user):
		if not request.json:
			abort(400)
		if 'username' not in request.json or 'groupname' not in request.json:
			abort(400)
		group = Groups.query.filter_by(groupName = request.json['groupname']).first()
		user = User.query.filter_by(username = request.json['username']).first()
		if group is None or user is None:
			abort(400)
		if user in group.users:
			abort(409)
		group.users.append(user)
		db.session.add(group)
		db.session.commit()
		return "SUCCESS", 200
	else:
		abort(401)

@app.route('/api/v1.0/associateTemplate', methods=['POST'])
@auth.login_required
def api_associate_template():
	user = g.user
	if isadmin(user):
		if not request.json:
			abort(400)
		if 'groupname' not in request.json or 'templatename' not in request.json:
			abort(400)
		group = Groups.query.filter_by(groupName = request.json['groupname']).first()
		template = Template.query.filter_by(name = request.json['templatename']).first()
		if group is None or template is None:
			abort(400)
		if template in group.Templates:
			abort(409)
		group.Templates.append(template)
		db.session.add(group)
		db.session.commit()
		return "SUCESSS", 200
	else:
		abort(401)

@app.route('/api/v1.0/getGroups', methods=['GET'])
@auth.login_required
def api_get_groups():
	user = g.user
	if isadmin(user):
		groups_json = []
		groups = Groups.query.filter_by(active = True).all()
		for group in groups:
			groups_json.append(group.get_json())
		return jsonify(response = groups_json)
	else:
		abort(401)

@app.route('/api/v1.0/getUsers', methods=['GET'])
@auth.login_required
def api_get_user():
	user = g.user
	if isadmin(user):
		users_json = []
		users = User.query.filter_by(active = True).all()
		for user in users:
			users_json.append(user.get_json())
		return jsonify(response = users_json)
	else:
		abort(401)

@app.route('/api/v1.0/getTemplates', methods=['GET'])
@auth.login_required
def api_get_templates():
	user = g.user
	if isadmin(user):
		templates_json = []
		templates = Template.query.filter_by(active = True).all()
		for template in templates:
			templates_json.append(template.get_json())
		return jsonify(response = templates_json)
	else:
		abort(401)





