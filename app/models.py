from app import db



userGroup = db.Table('userGroup', db.Model.metadata,
	db.Column('user_id',db.Integer,db.ForeignKey('user.id')),
	db.Column('group_id',db.Integer,db.ForeignKey('groups.id')))

groupTemplate = db.Table('groupTemplate',db.Model.metadata,
	db.Column('group_id',db.Integer,db.ForeignKey('groups.id')),
	db.Column('template_id',db.Integer,db.ForeignKey('template.id')))

class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(64), index=True, unique=True)
	name = db.Column(db.String(64))
	email = db.Column(db.String(120), index=True, unique=True)
	active = db.Column(db.Boolean)
	action = db.relationship('Action',backref='user',lazy='dynamic')
	password = db.Column(db.String)
	Groups = db.relationship('Groups',
							secondary = userGroup,
							backref = 'user')

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
	active = db.Column(db.Boolean)
	users = db.relationship('User',
							secondary = userGroup,
							backref = 'groups')
	Templates = db.relationship('Template',
								secondary = groupTemplate,
								backref = 'groups')

	def __repr__(self):
		return '<Group %r>' % (self.groupName)




class Template(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	name = db.Column(db.String, index = True, unique = True)
	filename = db.Column(db.String)
	active = db.Column(db.Boolean)
	data = db.relationship('Data',backref = 'template',lazy = 'dynamic')
	Groups = db.relationship('Groups',
							secondary = groupTemplate,
							backref = 'template')
	def __repr__(self):
		return '<Template %r>' % (self.name)


class Data(db.Model):
	id = db.Column(db.Integer,primary_key=True)
	data = db.Column(db.String)
	template_id = db.Column(db.Integer, db.ForeignKey('template.id'))
	active = db.Column(db.Boolean)
	def __repr__(self):
		return '<Data %r>' % (self.data)

class Action(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    action = db.Column(db.String(140))
    timestamp = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
		return '<Action %r>' % (self.action)