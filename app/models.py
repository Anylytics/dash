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
		return '<User %r>' % (self.username)


class Groups(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	groupName = db.Column(db.String(64), index=True, unique=True)


userGroup = db.Table('userGroup',
	db.Column('user_id',db.Integer,db.ForeignKey('user.id')),
	db.Column('group_id',db.Integer,db.ForeignKey('group.id')))



class Template(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	name = db.Column(db.String, index = True, unique = True)
	filename = db.Column(db.String)
	data = db.relationship('Data',backref = 'template',lazy = 'dynamic')
	def __repr__(self):
		return '<Template %r>' % (self.name)


class Data(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	data = db.Column(db.String)
	template_id = db.Column(db.Integer, db.ForeignKey('template.id'))
	def __repr__(self):
		return '<Data %r>' % (self.data)

class Action(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    action = db.Column(db.String(140))
    timestamp = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
		return '<Action %r>' % (self.action)