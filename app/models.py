from app import db

class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(64), index=True, unique=True)
	email = db.Column(db.String(120), index=True, unique=True)
	action = db.relationship('Action',backref='user',lazy='dynamic')
	password = db.Column(db.String)


	def is_authenticated(self):
		return True

	def is_active(self):
		return True

	def is_anonymous(self):
		return False

	def get_id(self):
		try:
			return unicode(self.id)
		except NameError:
			return str(self.id)
	
	def __repr__(self):
		return '<User %r>' % (self.nickname)


class Template(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	name = db.Column(db.String, index = True, unique = True)
	filename = db.Column(db.String)
	data = db.relationship('Data',backref = 'template',lazy = 'dynamic')

class Data(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	type = db.Column(db.String(120),index = True)
	data = db.Column(db.String)
	template_id = db.Column(db.Integer, db.ForeignKey('template.id'))

class Action(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    action = db.Column(db.String(140))
    timestamp = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
		return '<Action %r>' % (self.action)